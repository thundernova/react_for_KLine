// eslint-disable-next-line import/no-extraneous-dependencies
import client from 'webpack-theme-color-replacer/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import generate from '@ant-design/colors/lib/generate';

export default {
  getAntdSerials(color) {
    const lightCount = 9;
    const divide = 10; // 淡化（即less的tint）

    let lightens = new Array(lightCount).fill(0);
    lightens = lightens.map((_, i) => client.varyColor.lighten(color, i / divide));
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },

  changeColor(color) {
    if (!color) {
      return Promise.resolve();
    }

    const options = {
      // new colors array, one-to-one corresponde with `matchColors`
      newColors: this.getAntdSerials(color),

      printTempUrl(tempUrl) {
        console.log('tempUrl=', tempUrl);
        return tempUrl;
      },

      changeUrl(cssUrl) {
        console.log('cssURL=', cssUrl);
        // while router is not `hash` mode, it needs absolute path
        return `/${cssUrl}`;
      },
    };
    return client.changer.changeColor(options, Promise);
  },
};
