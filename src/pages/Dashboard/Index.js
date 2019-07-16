import React from 'react';
import { connect } from 'dva';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Modal, message, Button } from 'antd';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'], // remove formatting button
];

@connect(({ global }) => ({
  global,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.uploadInput = React.createRef();
    this.reactQuillRef = React.createRef();

    this.state = {
      content: '',
      src: '',
      file: '',
      uploadBoxVisible: false,
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: this.showUploadBox.bind(this),
          },
        },
      },
    };
  }

  handleChange(value) {
    this.setState({
      content: value,
    });
  }

  // react组件中定义方法
  showUploadBox() {
    this.setState({
      uploadBoxVisible: true,
    });
  }

  hideUploadBox() {
    this.setState({
      uploadBoxVisible: false,
    });
  }

  // 组件中定义选择图片的方法
  selectImage() {
    this.uploadInput.current.click(); // 点击modal的html结构中的input标签
  }

  imageHandler(url) {
    const quill = this.reactQuillRef.current.getEditor();
    const cursorPosition = quill.getSelection().index;
    quill.insertEmbed(cursorPosition, 'image', url); // 插入图片
    quill.setSelection(cursorPosition + 1); // 光标位置加1
  }

  changeImageBeforeUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let src;
    // 匹配类型为image/开头的字符串
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      src = URL.createObjectURL(file);
    } else {
      message.error('图片上传只支持JPG/PNG格式,请重新上传！');
      return;
    }
    if (file.size / 1024 / 1024 > 5) {
      message.error('图片上传大小不要超过5MB,请重新上传！');
      return;
    }
    this.setState({
      src,
      file,
    });
  }

  handleUpload() {
    const that = this;
    const { file } = this.state;
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('files', file);
    formData.append('loginName', 'xg');
    dispatch({
      type: 'global/upload',
      payload: formData,
      callback: res => {
        that.imageHandler(res[0]);
        that.hideUploadBox();
      },
    });
  }

  render() {
    const { content, modules, src, uploadBoxVisible } = this.state;
    return (
      <div>
        <ReactQuill
          ref={this.reactQuillRef}
          value={content}
          onChange={e => this.handleChange(e)}
          modules={modules}
        />
        <Modal
          title="上传图片"
          visible={uploadBoxVisible}
          onCancel={() => this.hideUploadBox()}
          onOk={() => this.handleUpload()}
          maskClosable={false}
          width={500}
        >
          <div className="top_btn top_btn_upload">
            <div>
              <Button
                onClick={() => this.selectImage()}
                style={{ background: '#18ade4', border: 'none', color: '#fff' }}
              >
                选择图片
              </Button>
              <input
                ref={this.uploadInput}
                type="file"
                accept="image/*"
                style={{ width: '100px', border: 'none', visibility: 'hidden' }}
                onChange={e => this.changeImageBeforeUpload(e)}
              />
            </div>
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              {src ? (
                <img src={src} alt="图片" style={{ maxWidth: '100%', height: '300px' }} />
              ) : (
                <div style={{ background: '#f2f2f2', width: '100%', height: '300px' }} />
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Index;
