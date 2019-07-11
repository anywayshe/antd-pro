import React from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'dva';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '页面',
    dataIndex: 'pageName',
    key: 'pageName',
  },
  {
    title: '路径',
    dataIndex: 'pagePath',
    key: 'pagePath',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作',
    render: () => (
      <span>
        <a href="javascript:;"> Edit</a>
        <Divider type="vertical" />
        <a href="javascript:;"> Delete</a>
      </span>
    ),
  },
];

@connect(({ list }) => ({
  list,
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/queryList',
      callback: res => {
        this.setState({
          list: res,
        });
      },
    });
  }

  render() {
    const { list } = this.state;
    return <Table columns={columns} dataSource={list} rowKey={(record, index) => index} />;
  }
}

export default Index;
