/**
 * @file 照片墙
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react';

import {
  Icon,
  Modal,
  Upload
} from 'antd';

class PictureWall extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.getFileList(this.state.fileList);
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ]
  };

  handleCancel = () => this.setState({
    previewVisible: false
  });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({fileList}) => {
    this.setState({fileList});
    this.props.getFileList(fileList);
  };

  render() {
    const {
      previewVisible,
      previewImage,
      fileList
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imgsCtl = this.props.canEdit ? true : {
      showPreviewIcon: true,
      showRemoveIcon: false
    };
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          showUploadList={imgsCtl}>
          {(!this.props.canEdit || fileList.length >= 3) ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PictureWall;
