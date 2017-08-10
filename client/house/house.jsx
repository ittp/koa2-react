/**
 * @file 房屋信息页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './house.less';
import 'component/Hello.less';
import React       from 'react';
import ReactDom    from 'react-dom';
import {observer}  from 'mobx-react';
import Store       from './houseStore';
import PictureWall from 'component/PictureWall';

import {
  Form,
  // Icon,
  Radio,
  Input,
  Select,
  Button,
  InputNumber
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

let isNode = typeof window === 'undefined';
let fileList = [];

@observer
class HousePageForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  getFileList = (list) => {
    fileList.length = 0;
    list.map((item) => {
      fileList.push(item.url);
    });
  }
  handleTypeChange = (e) => {
    const {form} = this.props;
    form.setFieldsValue({
      typeValue: +e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.imgs = fileList;
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      getFieldValue
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      }
    };
    const typeOptions = this.props.store.formData.type.map(
      (type) => <RadioButton key={type.value} value={type.value}>{type.text}</RadioButton>
    );
    const rentTypeOptions = this.props.store.formData.rentType.map(
      (type) => <Option key={type.value}>{type.text}</Option>
    );
    const decorateOptions = this.props.store.formData.decorate.map(
      (type) => <Option key={type.value}>{type.text}</Option>
    );
    const roomtypeOptions = this.props.store.formData.roomtype.map(
      (type) => <Option key={type.value}>{type.text}</Option>
    );
    const roomlimitOptions = this.props.store.formData.roomlimit.map(
      (type) => <Option key={type.value}>{type.text}</Option>
    );
    const tagsOptions = this.props.store.formData.tags.map(
      (tag) => <Option key={tag}>{tag}</Option>
    );
    const titleError = isFieldTouched('title') && getFieldError('title');
    const addrError = isFieldTouched('addr') && getFieldError('addr');
    const ownerError = isFieldTouched('owner') && getFieldError('owner');
    const telError = isFieldTouched('tel') && getFieldError('tel');
    getFieldDecorator('typeValue', {
      initialValue: 0
    });
    const priceArea = (typeValue) => {
      if (typeValue === 0) {
        return (
          <div>
            <FormItem
              {...formItemLayout}
              label="租金类型">
              {getFieldDecorator('rentType', {
                initialValue: this.props.store.house.rentType + ''
              })(
                <Select disabled={!this.props.store.canEdit}>
                  {rentTypeOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="租金">
              {getFieldDecorator('rentPrice', {
                initialValue: this.props.store.house.rentPrice
              })(
                <InputNumber min={1} max={90000}
                  disabled={!this.props.store.canEdit} />
              )}元
            </FormItem>
          </div>
        );
      }
      if (typeValue === 1) {
        return (
          <FormItem
            {...formItemLayout}
            label="售价">
            {getFieldDecorator('sellPrice', {
              initialValue: this.props.store.house.sellPrice
            })(
              <InputNumber min={1} max={5000}
                disabled={!this.props.store.canEdit} />
            )}万元
          </FormItem>
        );
      }
      return (
        <div>
          <FormItem
            {...formItemLayout}
            label="租金类型">
            {getFieldDecorator('rentType', {
              initialValue: this.props.store.house.rentType + ''
            })(
              <Select disabled={!this.props.store.canEdit}>
                {rentTypeOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="租金">
            {getFieldDecorator('rentPrice', {
              initialValue: this.props.store.house.rentPrice
            })(
              <InputNumber min={1} max={90000}
                disabled={!this.props.store.canEdit} />
            )}元
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="售价">
            {getFieldDecorator('sellPrice', {
              initialValue: this.props.store.house.sellPrice
            })(
              <InputNumber min={1} max={5000}
                disabled={!this.props.store.canEdit} />
            )}万元
          </FormItem>
        </div>
      );
    };
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            validateStatus={titleError ? 'error' : ''}
            help={titleError || ''}
            label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题!'
                }
              ],
              initialValue: this.props.store.house.title
            })(
              <Input maxLength="50"
                placeholder="请输入标题"
                disabled={!this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="交易类型">
            {getFieldDecorator('type', {
              initialValue: this.props.store.house.type,
              onChange: this.handleTypeChange
            })(
              <RadioGroup disabled={!this.props.store.canEdit}>
                {typeOptions}
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={addrError ? 'error' : ''}
            help={addrError || ''}
            label="地址">
            {getFieldDecorator('addr', {
              rules: [
                {
                  required: true,
                  message: '请输入地址!'
                }
              ],
              initialValue: this.props.store.house.address
            })(
              <Input
                maxLength="200"
                placeholder="请输入地址"
                type="textarea"
                autosize={{minRows: 2, maxRows: 6}}
                disabled={!this.props.store.canEdit}
              />
            )}
          </FormItem>
          {priceArea(getFieldValue('typeValue'))}
          <FormItem
            {...formItemLayout}
            label="面积">
            {getFieldDecorator('square', {
              initialValue: this.props.store.house.square
            })(
              <InputNumber min={1} max={10000}
                disabled={!this.props.store.canEdit} />
            )}平方米
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="楼层">
            {getFieldDecorator('floor', {
              initialValue: this.props.store.house.floor
            })(
              <InputNumber min={-10} max={100}
                disabled={!this.props.store.canEdit} />
            )}层
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="总层数">
            {getFieldDecorator('totalFloor', {
              initialValue: this.props.store.house.totalFloor
            })(
              <InputNumber min={1} max={100}
                disabled={!this.props.store.canEdit} />
            )}层
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="卧室">
            {getFieldDecorator('bedroom', {
              initialValue: this.props.store.house.bedroom
            })(
              <InputNumber min={1} max={100}
                disabled={!this.props.store.canEdit} />
            )}层
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客厅">
            {getFieldDecorator('drawingroom', {
              initialValue: this.props.store.house.drawingroom
            })(
              <InputNumber min={1} max={100}
                disabled={!this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="卫生间">
            {getFieldDecorator('toilet', {
              initialValue: this.props.store.house.toilet
            })(
              <InputNumber min={1} max={10}
                disabled={!this.props.store.canEdit} />
            )}层
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="装修类型">
            {getFieldDecorator('decorate', {
              initialValue: this.props.store.house.decorate + ''
            })(
              <Select disabled={!this.props.store.canEdit}>
                {decorateOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="房屋类型">
            {getFieldDecorator('roomtype', {
              initialValue: this.props.store.house.roomtype + ''
            })(
              <Select disabled={!this.props.store.canEdit}>
                {roomtypeOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="朝向">
            {getFieldDecorator('orientation', {
              initialValue: this.props.store.house.orientation
            })(
              <Input maxLength="10" placeholder="请输入朝向"
                disabled={!this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="房屋限制">
            {getFieldDecorator('roomlimit', {
              initialValue: this.props.store.house.roomlimit + ''
            })(
              <Select disabled={!this.props.store.canEdit}>
                {roomlimitOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={ownerError ? 'error' : ''}
            help={ownerError || ''}
            label="联系人">
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请输入联系人!'
                }
              ],
              initialValue: this.props.store.house.owner
            })(
              <Input maxLength="50" placeholder="请输入联系人"
                disabled={!this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={telError ? 'error' : ''}
            help={telError || ''}
            label="联系电话">
            {getFieldDecorator('tel', {
              rules: [
                {
                  required: true,
                  message: '请输入联系电话!'
                }
              ],
              initialValue: this.props.store.house.tel
            })(
              <Input maxLength="50" placeholder="请输入联系电话"
                disabled={!this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择标签">
            {getFieldDecorator('tags', {
              initialValue: this.props.store.house.tags
            })(
              <Select mode="tags" disabled={!this.props.store.canEdit}>
                {tagsOptions}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上传照片">
            {getFieldDecorator('imgs', {
              initialValue: this.props.store.house.imgs
            })(
              <PictureWall getFileList={this.getFileList}
                canEdit={this.props.store.canEdit} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}>
            {!this.props.store.canEdit ? null : <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}>
              提交
            </Button>}
          </FormItem>
        </Form>
      </div>
    );
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const HousePage = Form.create()(HousePageForm);

if (!isNode) {
  ReactDom.render(
    <HousePage store={new Store(window.__initData)} />,
    document.getElementById('root')
  );
}

export default HousePage;
