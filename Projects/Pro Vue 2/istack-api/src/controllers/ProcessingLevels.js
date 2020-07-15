import ProcessingLevel from '../models/ProcessingLevel';

export const getProcessingLevels = async (req, res) => {
  let page = 0;
  let size = 20;
  if (req.body.page) page = req.body.page;
  if (req.body.size) size = req.body.size;
  try {
    const { results, total } = await ProcessingLevel.query().page(page, size);
    if (results)
      res.json({
        success: true,
        processing_levels: results,
        total,
      });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Request failed! Please check the request',
    });
  }
};

export const getProcessingLevel = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const processing_level = await ProcessingLevel.query().findById(id);
      if (processing_level) {
        res.json({
          success: true,
          processing_level,
        });
      } else {
        res.json({
          success: false,
          message: 'Processing Level does not exist!',
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

export const createProcessingLevel = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (title) {
    try {
      const exists = await ProcessingLevel.query().findOne({ title });

      if (!exists) {
        const processing_level = await ProcessingLevel.query().insert(data);
        if (processing_level) {
          res.status(201).json({
            success: true,
            message: 'Processing Level created successfuly!',
            processing_level,
          });
        } else {
          res.status(403).json({
            success: false,
            message:
              'Processing Level creation failed! Please check the request',
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Processing Level already exists',
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
      message: 'Processing Level creation failed! Please check the request',
    });
  }
};

export const updateProcessingLevel = async (req, res) => {
  const title = req.body.title || null;
  const description = req.body.description || null;
  const id = parseInt(req.params.id);

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;

  if (!isNaN(id)) {
    try {
      if (Object.keys(data).length) {
        const processing_level = await ProcessingLevel.query().patchAndFetchById(
          id,
          data
        );

        if (processing_level) {
          res.json({
            success: true,
            message: 'Processing Level was updated successfuly',
            processing_level,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Processing Level does not exist',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Processing Level update failed! Please check the request',
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

export const deleteProcessingLevel = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    try {
      const processing_level = await ProcessingLevel.query()
        .deleteById(id)
        .returning('*');

      if (!processing_level) {
        res.status(404).json({
          success: false,
          message: 'Processing Level does not exist',
        });
      } else {
        res.json({
          success: true,
          message: 'Processing Level was deleted successfuly',
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
