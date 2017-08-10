/**
 * @file 列表页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './list.less';
import 'component/Hello.less';
import React            from 'react';
import ReactDom         from 'react-dom';
import Hello            from 'component/Hello';
import TapEvent         from 'react-tap-event-plugin';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  green100,
  green500,
  green700
} from 'material-ui/styles/colors';
import {
  RaisedButton,
  DatePicker
} from 'material-ui';

TapEvent();

let isNode = typeof window === 'undefined';

class ListPage extends React.Component {
  btnClick(e) {
    console.log(e);
  }
  render() {
    const DateTimeFormat = global.Intl.DateTimeFormat;
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: green500,
        primary2Color: green700,
        primary3Color: green100
      }
    }, {
      avatar: {
        borderColor: null
      },
      userAgent: this.props.ua
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <RaisedButton primary={true} label="Default"
            onTouchTap={this.btnClick}/>
          <Hello text={this.props.text}/>
          <DatePicker id="DatePicker" hintText="请选择时间"
            DateTimeFormat={DateTimeFormat}
            locale="zh-Hans-CN"/>
        </div>
      </MuiThemeProvider>
    );
  }
}

if (!isNode) {
  ReactDom.render(<ListPage text="list"/>, document.getElementById('root'));
}

export default ListPage;
