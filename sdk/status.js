(function () {
  var connIndex = 0;
  exports.code = {
    WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_AUTH_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_REOPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_SERVER_CLOSE_ERROR: connIndex++,
    // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
    WEBIM_CONNCTION_SERVER_ERROR: connIndex++,
    // 8: offline by multi login
    WEBIM_CONNCTION_IQ_ERROR: connIndex++,
    WEBIM_CONNCTION_PING_ERROR: connIndex++,
    WEBIM_CONNCTION_NOTIFYVERSION_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROSTER_ERROR: connIndex++,
    WEBIM_CONNCTION_CROSSDOMAIN_ERROR: connIndex++,
    WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: connIndex++,
    WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: connIndex++,
    WEBIM_CONNCTION_DISCONNECTED: connIndex++,
    // 16: server-side close the websocket connection
    WEBIM_CONNCTION_AJAX_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMINFO_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMMEMBER_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: connIndex++,
    WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_QUITCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_CALLBACK_INNER_ERROR: connIndex++,
    WEBIM_CONNCTION_CLIENT_OFFLINE: connIndex++,
    // 32: client offline
    WEBIM_CONNCTION_CLIENT_LOGOUT: connIndex++,
    // 33: client logout
    WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
    WEBIM_UPLOADFILE_ERROR: 101,
    WEBIM_UPLOADFILE_NO_LOGIN: 102,
    WEBIM_UPLOADFILE_NO_FILE: 103,
    WEBIM_DOWNLOADFILE_ERROR: 200,
    WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
    WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,
    WEBIM_MESSAGE_REC_TEXT: 300,
    WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
    WEBIM_MESSAGE_REC_EMOTION: 302,
    WEBIM_MESSAGE_REC_PHOTO: 303,
    WEBIM_MESSAGE_REC_AUDIO: 304,
    WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
    WEBIM_MESSAGE_REC_VEDIO: 306,
    WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
    WEBIM_MESSAGE_REC_FILE: 308,
    WEBIM_MESSAGE_SED_TEXT: 309,
    WEBIM_MESSAGE_SED_EMOTION: 310,
    WEBIM_MESSAGE_SED_PHOTO: 311,
    WEBIM_MESSAGE_SED_AUDIO: 312,
    WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
    WEBIM_MESSAGE_SED_VEDIO: 314,
    WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
    WEBIM_MESSAGE_SED_FILE: 316,
    STATUS_INIT: 400,
    STATUS_DOLOGIN_USERGRID: 401,
    STATUS_DOLOGIN_IM: 402,
    STATUS_OPENED: 403,
    STATUS_CLOSING: 404,
    STATUS_CLOSED: 405,
    STATUS_ERROR: 406
  };
})();