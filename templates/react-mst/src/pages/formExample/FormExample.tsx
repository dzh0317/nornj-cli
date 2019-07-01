import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Form, Input, Select, Radio, Button, Cascader, DatePicker, Checkbox } from 'antd';
import styled from 'styled-components';

const Containter = styled.div`
  padding: 100px 100px 40px 30px;
  background-color: #fff;

  h2 {
    margin-bottom: 25px;
    font-size: 16px;
  }

  .formEls {
    padding: 5px 80px 20px;
  }

  .btnArea {
    text-align: center;

    .ant-btn {
      margin-right: 15px;
    }
  }
`;

@inject('store')
@observer
export default class FormExample extends Component<IProps> {
  render() {
    const {
      store: { formExample }
    } = this.props;

    return <AntFormExample />;
  }
}

@inject('store')
@observer
class AntFormExampleClass extends Component<IProps> {
  @observable inputValue = '示例数据';

  @observable textareaValue = '示例数据';

  @observable selectValue = '1';

  @observable checkboxValue = ['2'];

  onAntSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  onAntReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const {
      store: { formExample }
    } = this.props;

    return (
      <Containter>
        <h2>Ant Design 表单控件示例</h2>
        <div>
          <div className="formEls">
            <Input n-mobxBind={this.inputValue} />
            <div>
              inputValue：<i n-style="color:purple">{this.inputValue}</i>
            </div>
          </div>
          <div className="formEls">
            <Input.TextArea n-mobxBind={this.textareaValue} />
            <div>
              textareaValue：<i n-style="color:purple">{this.textareaValue}</i>
            </div>
          </div>
          <div className="formEls">
            <Select n-mobxBind={this.selectValue} n-style="width:100%" placeholder="请选择">
              <Select.Option value="1">测试数据1</Select.Option>
              <Select.Option value="2">测试数据2</Select.Option>
              <Select.Option value="3">测试数据3</Select.Option>
            </Select>
            <div>
              selectValue：<i n-style="color:purple">{this.selectValue}</i>
            </div>
          </div>
          <div className="formEls">
            <Checkbox.Group n-mobxBind={this.checkboxValue}>
              <Checkbox value="1">Option A</Checkbox>
              <Checkbox value="2">Option B</Checkbox>
              <Checkbox value="3">Option C</Checkbox>
            </Checkbox.Group>
            <div>
              checkboxValue：<i n-style="color:purple">{this.checkboxValue}</i>
            </div>
          </div>
        </div>
        <h2>Ant Design 表单验证示例</h2>
        <Form>
          <Form.Item
            label="表单元素1"
            n-field-formEl1={{
              initialValue: formExample.antInputValue,
              rules: [{ required: true, message: '表单元素1不能为空！' }]
            }}
            n-fieldSpan-3>
            <Input />
          </Form.Item>
          <Form.Item
            label="表单元素2"
            n-field-formEl2={{
              initialValue: formExample.antSelectValue,
              rules: [{ required: true, message: '表单元素2不能为空！' }]
            }}
            n-fieldSpan-3>
            <Select placeholder="请选择">
              <Select.Option value="1">测试数据1</Select.Option>
              <Select.Option value="2">测试数据2</Select.Option>
              <Select.Option value="3">测试数据3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="表单元素3"
            n-field-formEl3={{
              initialValue: formExample.antRadioValue,
              rules: [{ required: true, message: '表单元素3不能为空！' }]
            }}
            n-fieldSpan-3>
            <Radio.Group>
              <Radio value="1">选项1</Radio>
              <Radio value="2">选项2</Radio>
              <Radio value="3">选项3</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="表单元素4"
            n-field-formEl4={{
              initialValue: formExample.antCheckboxValue,
              rules: [{ required: true, message: '表单元素4不能为空！' }]
            }}
            n-fieldSpan-3>
            <Checkbox.Group>
              <Checkbox value="1">Option A</Checkbox>
              <Checkbox value="2">Option B</Checkbox>
              <Checkbox value="3">Option C</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="表单元素5"
            n-field-formEl5={{
              initialValue: formExample.antDate,
              rules: [{ required: true, message: '表单元素5不能为空！' }]
            }}
            n-fieldSpan-3>
            <DatePicker />
          </Form.Item>
          <div className="btnArea">
            <Button htmlType="submit" onClick={this.onAntSubmit}>
              提交
            </Button>
            <Button onClick={this.onAntReset}>重置</Button>
          </div>
        </Form>
      </Containter>
    );
  }
}

const AntFormExample = Form.create()(AntFormExampleClass);
