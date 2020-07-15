import Priority from '../models/Priority';

export const getPriorities = async (req, res) => {
  let page = 0;
  let size = 20;
  if (req.body.page) page = req.body.page;
  if (req.body.size) size = req.body.size;
  try {
    const { results, total } = await Priority.query().page(page, size);
    if (results)
      res.json({
        success: true,
        priorities: results,
        total,
      });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Request failed! Please check the request',
    });
  }
};

export const getPriority = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const priority = await Priority.query().findById(id);
      if (priority) {
        res.json({
          success: true,
          priority,
        });
      } else {
        res.json({
          success: false,
          message: 'Priority does not exist!',
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

export const createPriority = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (title) {
    try {
      const exists = await Priority.query().findOne({ title });

      if (!exists) {
        const priority = await Priority.query().insert(data);
        if (priority) {
          res.status(201).json({
            success: true,
            message: 'Priority created successfuly!',
            priority,
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'Priority creation failed! Please check the request',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Priority already exists',
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
      message: 'Priority creation failed! Please check the request',
    });
  }
};

export const updatePriority = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;
  const id = parseInt(req.params.id);

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (!isNaN(id)) {
    try {
      if (Object.keys(data).length) {
        const priority = await Priority.query().patchAndFetchById(id, data);

        if (priority) {
          res.json({
            success: true,
            message: 'Priority was updated successfuly',
            priority,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Priority does not exist',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Priority update failed! Please check the request',
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

export const deletePriority = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const priority = await Priority.query().deleteById(id).returning('*');

      if (!priority) {
        res.status(404).json({
          success: false,
          message: 'Priority does not exist',
        });
      } else {
        res.json({
          success: true,
          message: 'Priority was deleted successfuly',
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: 'Failed to delete priority',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Id must be a number!',
    });
  }
};
