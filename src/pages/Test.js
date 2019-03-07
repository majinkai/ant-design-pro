import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Input, Button, Table } from 'antd';

@connect(({ user, loading }) => ({
  list: user.list,
  loading: loading.effects['user/fetch'],
}))
class Test extends Component {
  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch = name => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: { name },
    });
  };

  render() {
    const { list, loading } = this.props;

    return (
      <Fragment>
        <Input.Group compact>
          <Input.Search
            onSearch={value => this.handleSearch(value)}
            style={{ width: 'calc(100% - 32px)' }}
            placeholder="输入名称查询"
          />
          <Button icon="filter" style={{ width: '32px' }} />
        </Input.Group>
        <Table dataSource={list} loading={loading} rowKey="key">
          <Table.Column title="Name" dataIndex="name" />
        </Table>
      </Fragment>
    );
  }
}

export default Test;
