import Status from '../models/Status';

export const getStatuses = async (req, res) => {
  let page = 0;
  let size = 20;
  if (req.body.page) page = req.body.page;
  if (req.body.size) size = req.body.size;
  try {
    const { results, total } = await Status.query().page(page, size);
    if (results)
      res.json({
        success: true,
        statuses: results,
        total,
      });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Request failed! Please check the request',
    });
  }
};

export const getStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const status = await Status.query().findById(id);
      if (status) {
        res.json({
          success: true,
          status,
        });
      } else {
        res.json({
          success: false,
          message: 'Status does not exist!',
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

export const createStatus = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (title) {
    try {
      const exists = await Status.query().findOne({ title });

      if (!exists) {
        const status = await Status.query().insert(data);
        if (status) {
          res.status(201).json({
            success: true,
            message: 'Status created successfuly!',
            status,
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'Status creation failed! Please check the request',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Status already exists',
        });
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Status creation failed! Please check the request',
    });
  }
};

export const updateStatus = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;
  const id = parseInt(req.params.id);

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (!isNaN(id)) {
    try {
      if (Object.keys(data).length) {
        const status = await Status.query().patchAndFetchById(id, data);

        if (status) {
          res.json({
            success: true,
            message: 'Status was updated successfuly',
            status,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Status does not exist',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Status update failed! Please check the request',
        });
      }
    } catch (error) {
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

export const deleteStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const status = await Status.query().deleteById(id).returning('*');

      if (!status) {
        res.status(404).json({
          success: false,
          message: 'Status does not exist',
        });
      } else {
        res.json({
          success: true,
          message: 'Status was deleted successfuly',
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: 'Failed to delete status',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Id must be a number!',
    });
  }
};
