const Status = require('http-status');

/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err);

  ////////////////////////
  /// ERROR DEFINITIONS ///
  ////////////////////////

  /**
   * define unauthorized response
   * @param  {[object]} err [given error object]
   * @return {[function]}     [response]
   */
  const buildUnauthorizedResponse = (err) => {
    return res.status(Status.UNAUTHORIZED).send('Unauthorized');
  }

  /**
   * define validation error response
   * @param  {[object]} err [given error object]
   * @return {[function]}     [response]
   */
  const buildValidationErrorResponse = (err) => {
    return res.status(Status.BAD_REQUEST).json({
      type: 'ValidationError',
      details: err.message.details
    });
  }

  /**
   * define internal server error response
   * @param  {[object]} err [given error object]
   * @return {[function]}     [response]
   */
  const buildInternalServerErrorResponse = (err) => {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      type: 'InternalServerError',
      message: err.message,
      stack: err.stack
    });
  }

  /**
   * error response selection
   * @param  {[object]} err [given error object]
   * @return {[function]}     [response]
   */
  const errorResponse = (err) => {
    const responses = {
      'UNAUTHORIZED': buildUnauthorizedResponse,
      'VALIDATION_ERROR': buildValidationErrorResponse,
      'INTERNAL_SERVER_ERROR': buildInternalServerErrorResponse
    }
    return (responses[err.type] || responses['INTERNAL_SERVER_ERROR'])(err)
  }
  debugger;
  errorResponse(err);
};
