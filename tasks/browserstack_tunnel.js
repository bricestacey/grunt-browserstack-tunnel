'use strict';
module.exports = function(grunt) {
  grunt.registerMultiTask('browserstackTunnel', 'Create BrowserStack tunnel', function() {
    var options = this.options();

    if (options.accessKey) {
      options.key = options.accessKey;
      delete options.accessKey;
    }

    if (options.hostname || options.port || options.sslFlag) {
      options.hosts = [{
        name: options.hostname,
        port: options.port,
        sslFlag: options.sslFlag
      }];
      delete options.hostname;
      delete options.port;
      delete options.sslFlag;
    }

    var BrowserStackTunnel = require('browserstacktunnel-wrapper');
    var browserStackTunnel = new BrowserStackTunnel(options);

    var done = this.async();
    browserStackTunnel.start(function (error) {
      if (error) {
        grunt.log.error('Could not start tunnel');
        grunt.log.debug(error);
        done(false);
      } else {
        grunt.log.ok('Start tunnel successfully');
        done();
      }
    });
  });
};
