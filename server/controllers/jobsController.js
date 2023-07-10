import Job from "../models/jobsModel.js";
import { checkPermission } from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new Error("Please Provide All Values");
  }

  req.body.createdBy = req.user._id;

  const job = await Job.create(req.body);
  return res.status(201).json({ job });
};

export const getAllJob = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user._id,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  return res.status(200).json({ jobs, totalJobs, numOfPages });
};

export const getSingleJob = (req, res) => {
  res.status(200).json({ msg: "Job single" });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const { company, position } = req.body;

  if (!company || !position) {
    throw new Error("Please Provide All Values");
  }

  const job = await Job.findOne({ _id: jobId });
  // console.log(typeof job.createdBy);
  // console.log(typeof req.user._id);

  if (!job) {
    throw new Error(`No job with id ${jobId}`);
  }

  // check permissions
  // checkPermission(req.user._id, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new Error(`No jib with such an id ${jobId}`);
  }

  await job.deleteOne();

  return res.status(200).json({ msg: "Job deleted" });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    // console.log(curr);
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  return res.status(200).json({ defaultStats, monthlyApplications });
};
