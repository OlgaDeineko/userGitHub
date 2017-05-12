function NotificationService($translate, toastr) {
  'ngInject'
  /**
   * show alert
   * @param type
   * @param {string[]} messages
   * @param {string}titleMessage
   * @private
   */
  let _notify = (type, messages, titleMessage) => {
    if (!messages) return;

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    _translate(titleMessage)
      .then((title) => {
        messages.forEach((msg) => {
          _translate(msg).then(translation => {
            toastr[type](translation, title);
          })
        })
      });
  };

  /**
   * translate function
   * @param {string} msg
   * @private
   */
  let _translate = (msg) => {
    return $translate(msg)
      .then((res) => res)
      .catch((res) => res)
  };

  /**
   * success message
   * @param {string|string[]} messages
   * @param {string} [title='SUCCESS']
   */
  let success = (messages, title='SUCCESS') => {
    _notify('success', messages, title)
  };

  /**
   * error message
   * @param {string|string[]} messages
   * @param {string} [title='ERROR']
   */
  let error = (messages, title='ERROR') => {
    return _notify('error', messages, title);
  };

  return {
    success,
    error
  }
}

export default NotificationService;
