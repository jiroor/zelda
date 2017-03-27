(function(global) {
  'use strict';

  Vue.use(function(Vue, options) {
    /**
     * @description
     * small cache of tokens
     */
    var c = {
      isSending: false
    };

    /**
     * @description
     * apiの取得
     *
     * @param {Object} req リクエスト情報
     * @returns {Promise} api取得のプロミス
     */
    function api(req, option) {
      // allow 1 api only per time
      if (c.isSending) {
        return Promise.reject(new Error('api is sending.'));
      } else {
        c.isSending = true;
      }

      option = _.defaults(option, {
        timeout: 10 * 1000
      });

      var reqUrl = formatReqUrl(req.url);
      var fetchOption = {
        method: 'post',
        headers: {
          'Accept': 'application/json; charset=UTF-8',
          'Content-Type': 'application/json'
        },
        body: encodeStringify(req.data)
      };

      return Promise.resolve(global.fetch(reqUrl, fetchOption))
        .timeout(option.timeout, new Error('api timeout.'))
        .bind(option)
        .then(checkAjaxStatus)
        .then(parseJSON)
        .finally(function() {
          // enable reuse of api no matter what happened
          // TODO: check timeout case if the token is changed or not
          c.isSending = false;
        });
    }

    /**
     * @description
     * dataをencodeする
     * TODO: apiのリクエストをjson化したらencodeを削除
     * @param {Object} data データ
     * @returns {String} encodedされたデータ
     * @private
     */
    function encodeStringify(data) {
      var encodedArray = _.transform(data, function(result, value, key) {
        var encoded = encodeURIComponent(key).replace(/%20/g, '+') + '=' + encodeURIComponent(value).replace(/%20/g, '+');
        result.push(encoded);
      }, []);

      return encodedArray.join('&');
    }

    /**
     * @description
     * ajaxのurlをフォーマットする
     * - 明記がある時hostを追加する
     * @param {String} url ajaxのurl
     * @returns {String} ajaxのurl
     */
    function formatReqUrl(url) {
      return ['http://jiroor.herokuapp.com', url].join('');
    }

    /**
     * @description
     * ajaxのステータスをチェックする
     * (通信は成功かどうか)
     * @param {Object} res ajaxのレスポンス
     * @returns {Promise}
     * @private
     */
    function checkAjaxStatus(res) {
      if (res.status === 200 || res.status === 204 || res.status === 0) {
        return res;
      } else {
        // throw error to reject all promises
        // and allow us to do something before moving to error page
        throw new Error('api not found.');
      }
    }

    /**
     * @description
     * ajaxのレスポンスをパースする
     * @param {Object} res ajaxのレスポンス
     * @returns {Promise}
     * @private
     */
    function parseJSON(res) {
      return res.json();
    }

    /**:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._*/

    // global
    namespace('fetch', {
      api: api
    });
  });

})(window);
