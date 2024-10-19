import { VIRFICE_APP_PREFIX } from "../../../../../conf";

export const commonCSS = `
.${VIRFICE_APP_PREFIX}-template-wrapper___ *{
      margin: 0;
      padding: 0;
      border: 0;
      vertical-align: baseline;
      cursor: default;
}
body {
      margin: 0;
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      text-align: center;
    }
    h2 {
      font-size: 20px;
      color: #333333;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555555;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      border: 0;
    }
`;
