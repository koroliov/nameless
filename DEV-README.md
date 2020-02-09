# Information related to development

This project attempts to follow the [Google JavaScript style guide](https://google.github.io/styleguide/jsguide.html).

If you decide to contribute or fork, the project won't "work" on Windows (the tests won't run) since it uses symlinks `node_modules -> ../src` to the src directory to be able to `require('module-to-test')`. Also some dev-utils won't work, since they use UNIX file system paths with forward slashes. If you need to install it on Windows ether fix those issues or open an issue here, at the time of this writing I don't see a necessity to do this.

Instructions to setup a webdriver grid to run the e2e tests are located in the tools directory, as well as command examples to validate HTML, CSS, minify the browserified file etc.

See commands present in the package.json file and their examples in the tools directory
