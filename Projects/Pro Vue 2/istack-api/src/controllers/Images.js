const { raw } = require('objection');
import Image from '../models/Image';
import Status from '../models/Status';
import Priority from '../models/Priority';
import ProcessingLevel from '../models/ProcessingLevel';

export const getImages = async (req, res) => {
  let page = 0;
  let size = 20;

  let status_id = null;
  let priority_id = null;
  let processing_level_id = null;

  if (req.body.page) page = req.body.page;
  if (req.body.size) size = req.body.size;
  try {
    if (req.body.status)
      status_id = (await Status.query().findOne({ title: req.body.status })).id;
    if (req.body.priority)
      priority_id = (
        await Priority.query().findOne({ title: req.body.priority })
      ).id;
    if (req.body.processing_level)
      processing_level_id = (
        await ProcessingLevel.query().findOne({
          title: req.body.processing_level,
        })
      ).id;
    const { results, total } = await Image.query()
      .modify('filter', status_id, priority_id, processing_level_id)
      .withGraphJoined('[status, priority, processing_level]')
      .orderBy([
        { column: 'status.id' },
        { column: 'priority.id', order: 'desc' },
      ])
      .page(page, size);
    if (results)
      res.json({
        success: true,
        images: results,
        total,
      });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: 'Request failed! Please check the request',
    });
  }
};

export const getImage = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const image = await Image.query()
        .findById(id)
        .withGraphJoined('[status, priority, processing_level]');
      if (image) {
        res.json({
          success: true,
          image,
        });
      } else {
        res.json({
          success: false,
          message: 'Image does not exist!',
        });
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        message: 'Request failed! Please check the request',
      });
    }
  } else {
    res.json({
      success: false,
      message: 'Id must be a number!',
    });
  }
};

export const createImage = async (req, res) => {
  const data = {};
  let status_id = null,
    priority_id = null,
    processing_level_id = null;

  if (req.body.satellite) data.satellite = req.body.satellite;
  if (req.body.quicklook) data.quicklook = req.body.quicklook;
  if (req.body.quicklook_url) data.quicklook_url = req.body.quicklook_url;
  if (req.body.code) data.code = req.body.code;
  if (req.body.polygon) data.polygon = req.body.polygon;
  if (req.body.meta_date) data.meta_date = req.body.meta_date;
  if (req.body.east) data.east = req.body.east;
  if (req.body.west) data.west = req.body.west;
  if (req.body.north) data.north = req.body.north;
  if (req.body.south) data.south = req.body.south;
  if (req.body.pitch) data.pitch = req.body.pitch;
  if (req.body.roll) data.roll = req.body.roll;
  if (req.body.yaw) data.yaw = req.body.yaw;
  if (req.body.coordinates) data.coordinates = req.body.coordinates;
  if (req.body.across_track_incidence_angle)
    data.across_track_incidence_angle = req.body.across_track_incidence_angle;
  if (req.body.along_track_incidence)
    data.along_track_incidence = req.body.along_track_incidence;
  if (req.body.incidence_angle) data.incidence_angle = req.body.incidence_angle;
  if (req.body.sun_elevation_angle)
    data.sun_elevation_angle = req.body.sun_elevation_angle;
  if (req.body.sun_azimuth_angle)
    data.sun_azimuth_angle = req.body.sun_azimuth_angle;
  if (req.body.raw_json) data.raw_json = req.body.raw_json;
  if (req.body.cloud_coverage) data.cloud_coverage = req.body.cloud_coverage;
  if (req.body.geometry) data.geometry = req.body.geometry;

  if (req.body.status) {
    try {
      status_id = (await Status.query().findOne({ title: req.body.status })).id;
      data.status_id = status_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  } else {
    try {
      status_id = (await Status.query().findOne({ title: 'unprocessed' })).id;
      data.status_id = status_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  }
  if (req.body.priority) {
    try {
      priority_id = (
        await Priority.query().findOne({ title: req.body.priority })
      ).id;
      data.priority_id = priority_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  } else {
    try {
      priority_id = (await Priority.query().findOne({ title: 'default' })).id;
      data.priority_id = priority_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  }
  if (req.body.processing_level) {
    try {
      processing_level_id = (
        await ProcessingLevel.query().findOne({
          title: req.body.processing_level,
        })
      ).id;
      data.processing_level_id = processing_level_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  } else {
    try {
      processing_level_id = (
        await ProcessingLevel.query().findOne({ title: 'L2' })
      ).id;
      data.processing_level_id = processing_level_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image creation failed! Please check the request',
      });
    }
  }

  if (
    data.satellite &&
    data.quicklook &&
    data.quicklook_url &&
    data.code &&
    data.meta_date &&
    data.status_id &&
    data.priority_id &&
    data.processing_level_id
  ) {
    try {
      const exists = await Image.query().findOne({ code: data.code });

      if (!exists) {
        const image = await Image.query().insert(data);

        if (image) {
          res.status(201).json({
            success: true,
            message: 'Image created successfuly!',
            image,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Image creation failed! Please check the request',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Image already exists',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: error,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Image creation failed! Please check the request',
    });
  }
};

export const updateImage = async (req, res) => {
  const data = {};
  let status_id = null,
    priority_id = null,
    processing_level_id = null;

  const id = parseInt(req.params.id);
  if (req.body.satellite) data.satellite = req.body.satellite;
  if (req.body.quicklook) data.quicklook = req.body.quicklook;
  if (req.body.quicklook_url) data.quicklook_url = req.body.quicklook_url;
  if (req.body.code) data.code = req.body.code;
  if (req.body.polygon) data.polygon = req.body.polygon;
  if (req.body.meta_date) data.meta_date = req.body.meta_date;
  if (req.body.east) data.east = req.body.east;
  if (req.body.west) data.west = req.body.west;
  if (req.body.north) data.north = req.body.north;
  if (req.body.south) data.south = req.body.south;
  if (req.body.pitch) data.pitch = req.body.pitch;
  if (req.body.roll) data.roll = req.body.roll;
  if (req.body.yaw) data.yaw = req.body.yaw;
  if (req.body.coordinates) data.coordinates = req.body.coordinates;
  if (req.body.across_track_incidence_angle)
    data.across_track_incidence_angle = req.body.across_track_incidence_angle;
  if (req.body.along_track_incidence)
    data.along_track_incidence = req.body.along_track_incidence;
  if (req.body.incidence_angle) data.incidence_angle = req.body.incidence_angle;
  if (req.body.sun_elevation_angle)
    data.sun_elevation_angle = req.body.sun_elevation_angle;
  if (req.body.sun_azimuth_angle)
    data.sun_azimuth_angle = req.body.sun_azimuth_angle;
  if (req.body.raw_json) data.raw_json = req.body.raw_json;
  if (req.body.cloud_coverage) data.cloud_coverage = req.body.cloud_coverage;
  if (req.body.geometry) data.geometry = req.body.geometry;

  if (req.body.status) {
    try {
      status_id = (await Status.query().findOne({ title: req.body.status })).id;
      data.status_id = status_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image update failed! Please check the request',
      });
    }
  }
  if (req.body.priority) {
    try {
      priority_id = (
        await Priority.query().findOne({ title: req.body.priority })
      ).id;
      data.priority_id = priority_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image update failed! Please check the request',
      });
    }
  }
  if (req.body.processing_level) {
    try {
      processing_level_id = (
        await ProcessingLevel.query().findOne({
          title: req.body.processing_level,
        })
      ).id;
      data.processing_level_id = processing_level_id;
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Image update failed! Please check the request',
      });
    }
  }

  if (req.body.order) {
    if (!isNaN(parseInt(req.body.order))) {
      try {
        const num = await Image.query()
          .patch({ order: raw('"order"+1') })
          .where('order', '>=', parseInt(req.body.order));
        data.order = req.body.order;
      } catch (error) {
        console.log('order', error);
        res.status(404).json({
          success: false,
          message: 'Image update failed! Please check the request',
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Order must be a number!',
      });
    }
  }

  if (!isNaN(id)) {
    try {
      if (Object.keys(data).length) {
        const image = await Image.query().patchAndFetchById(id, data);

        if (image) {
          res.json({
            success: true,
            message: 'Image was updated successfuly',
            image,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Image does not exist',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Image update failed! Please check the request',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: error,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Id must be a number!',
    });
  }
};

export const deleteImage = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const user = await User.query().deleteById(id).returning('*');

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Image does not exist',
        });
      } else {
        res.json({
          success: true,
          message: 'Image was deleted successfuly',
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: 'Failed to delete image',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Id must be a number!',
    });
  }
};
