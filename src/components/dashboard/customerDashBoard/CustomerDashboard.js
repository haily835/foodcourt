import React, { useRef, useState, useEffect } from "react";
import { Form, Input, InputNumber, Space, Divider, Row, Col } from "antd";
import axios from 'axios';

import { Layout, Breadcrumb, Statistic, Progress, Tag } from "antd";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import DashboardLayout from "./CustomerDashboardLayout";
import RecentTable from "./RecentTable";
import setUser from "npm/lib/config/set-user";
import _ from 'lodash';
import moment from 'moment'
const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div
        className="whiteBox shadow"
        style={{ color: "#595959", fontSize: 13, height: "106px" }}
      >
        <div
          className="pad15 strong"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h3 style={{ color: "#22075e", marginBottom: 0 }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]}>
            <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
              <div className="left">{prefix}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <Divider
                style={{
                  padding: "10px 0",
                  justifyContent: "center",
                }}
                type="vertical"
              ></Divider>
            </Col>
            <Col
              className="gutter-row"
              span={11}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tag
                color={tagColor}
                style={{
                  margin: "0 auto",
                  justifyContent: "center",
                }}
              >
                {tagContent}
              </Tag>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
const PreviewState = ({ tag, color, value }) => {
  let colorCode = "#000";
  switch (color) {
    case "bleu":
      colorCode = "#1890ff";
      break;
    case "green":
      colorCode = "#95de64";
      break;
    case "red":
      colorCode = "#ff4d4f";
      break;
    case "orange":
      colorCode = "#ffa940";
      break;
    case "purple":
      colorCode = "#722ed1";
      break;
    case "grey":
      colorCode = "#595959";
      break;
    case "cyan":
      colorCode = "#13c2c2";
      break;
    case "brown":
      colorCode = "#614700";
      break;
    default:
      break;
  }
  return (
    <div style={{ color: "#595959", marginBottom: 5 }}>
      <div className="left alignLeft">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          "0%": colorCode,
          "100%": colorCode,
        }}
      />
    </div>
  );
};


export default function CustomerDashboard() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const abortController = new AbortController();

  const getTotalOfCustomer = (cust) => {
    return _.sumBy(orders.filter(o => o.customerID === cust._id), o => o.total);
  }
  const isVip = (cust) => {
    if (getTotalOfCustomer(cust) >= 100000) {
      return <Tag color={'yellow'}>{"VIP: 100K"}</Tag>;
    } else {
      return null;
    }
  }

  const isNew = (cust) => {
    const priorDate = moment().subtract(30, 'days').toISOString();
    if (cust.createdAt >= priorDate) {
      return <Tag color={'blue'}>{"New this month"}</Tag>;
    } else {
      return null;
    }
  }

  const isOrderThisMonth = (cust) => {
    const priorDate = moment().subtract(30, 'days').toString();
    if (orders.find(o => o.createdAt >= priorDate)) {
      return <Tag color={'green'}>{"Ordered this month"}</Tag>;
    } else {
      return null;
    }
  }

  const isInActive = (cust) => {
    const priorDate = moment().subtract(30, 'days').toString();
    if (!orders.find(o => o.customerID === cust._id) || !orders.find(o => o.customerID === cust._id && o.createdAt >= priorDate )) {
      return <Tag color={'red'}>{"Inactive this month"}</Tag>;
    } else {
      return null;
    }
  }

  const getStatusCust = (cust) => {
    return [
      isVip(cust),
      isNew(cust),
      isInActive(cust),
      isOrderThisMonth(cust),
    ]
  }

  const [isReportUnMount, setReportUnMount] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      const resultItems = await axios.get("http://localhost:5000/items/", {
        signal: abortController.signal,
      });
      const resultUsers = await axios.get("http://localhost:5000/users/", {
        signal: abortController.signal,
      });
      const resultOrders = await axios.get("http://localhost:5000/orders/", {
        signal: abortController.signal,
      });
      if (!isReportUnMount) {
        setItems(resultItems.data);
        setUsers(resultUsers.data);
        setOrders(resultOrders.data?.filter(o => o.status).reverse());
      }
    };
    loadData();

    // clean up
    return () => {
      setReportUnMount(true);
    };
  }, []);
  const entity = "invoice213";
  const dataTableOrderColumns = [
    {
      title: "N#",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: ["customerName"],
    },

    {
      title: "Total",
      dataIndex: "total",

      render: (total) => `${total} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = status === "Denied" ? "volcano" : status === "New" ? "blue" : "green";

        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
  ];
  const dataTableCustColumns = [
    {
      title: "N#",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: ["username"],
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return status;
      },
    },
  ];
  

  
  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        <TopCard
          title={"Orders"}
          tagColor={"cyan"}
          prefix={"Total"}
          tagContent={orders.length + ' orders'}
        />
        <TopCard
          title={"Customers"}
          tagColor={"purple"}
          prefix={"Total"}
          tagContent={users.filter(user => user.role === 'customer').length + " customers"}
        />
        <TopCard
          title={"Payment"}
          tagColor={"green"}
          prefix={"This month"}
          tagContent={_.sumBy(orders, order => _.sumBy(order.items, i => i.price * i.number)) + " VND"}
        />
        {/* <TopCard
          title={'Due Balance'}
          tagColor={'red'}
          prefix={'Not Paid'}
          tagContent={'34 000 $'}
        /> */}
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
        >
          <div className="whiteBox shadow" style={{ minHeight: "380px" }}>
            <Row className="pad10" gutter={[0, 0]}>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <div className="pad15">
                  <h3
                    style={{
                      color: "#22075e",
                      marginBottom: 15,
                    }}
                  >
                    Order Preview
                  </h3>
                  {/* <PreviewState tag={'Draft'} color={'grey'} value={3} />
                  <PreviewState tag={'Pending'} color={'bleu'} value={5} />
                  <PreviewState tag={'Not Paid'} color={'orange'} value={12} />
                  <PreviewState tag={'Overdue'} color={'red'} value={6} />
                  <PreviewState tag={'Partially Paid'} color={'cyan'} value={8} />
                  <PreviewState tag={'Paid'} color={'green'} value={55} /> */}

                  <PreviewState tag={"New"} color={"bleu"} value={Math.round((orders.filter(o => o.status === 'New').length / orders.length)* 100)} />
                  <PreviewState tag={"Denied"} color={"orange"} value={Math.round((orders.filter(o => o.status === 'Denied').length / orders.length)* 100)} />
                  <PreviewState tag={"Ready"} color={"cyan"} value={100 - Math.round((orders.filter(o => o.status === 'New').length / orders.length)* 100) - Math.round((orders.filter(o => o.status === 'Denied').length / orders.length)* 100)} />
                </div>
              </Col>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                {" "}
                <div className="pad15">
                  <h3
                    style={{
                      color: "#22075e",
                      marginBottom: 15,
                    }}
                  >
                    Customer Preview
                  </h3>
                  <PreviewState tag={"New"} color={"bleu"} value={Math.round((users.filter(u => isNew(u) && u.role==='customer').length / users.filter(u => u.role==='customer').length)* 100)} />
                  <PreviewState tag={"VIP"} color={"orange"} value={Math.round((users.filter(u => isVip(u) && u.role==='customer').length / users.filter(u => u.role==='customer').length)* 100)} />
                  <PreviewState
                    tag={"Order this month"}
                    color={"cyan"}
                    value={Math.round((users.filter(u => isOrderThisMonth(u) && u.role==='customer').length / users.filter(u => u.role==='customer').length)* 100)}
                  />
                  <PreviewState tag={"Inactive"} color={"grey"} value={ Math.round((users.filter(u => isInActive(u) && u.role==='customer').length / users.filter(u => u.role==='customer').length)* 100)} />
                </div>
              </Col>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                {" "}
                <div className="pad15">
                  <h3
                    style={{
                      color: "#22075e",
                      marginBottom: 15,
                    }}
                  >
                    Order total Preview
                  </h3>
                  <PreviewState tag={">= 50K"} color={"grey"} value={Math.round((orders.filter(o => o.total >= 50000).length / orders.length)* 100)} />
                  <PreviewState tag={">= 200K"} color={"bleu"} value={Math.round((orders.filter(o => o.total >= 200000).length / orders.length)* 100)} />
                  <PreviewState tag={">= 500K"} color={"orange"} value={100 - Math.round((orders.filter(o => o.total >= 50000).length / orders.length)* 100) - Math.round((orders.filter(o => o.total >= 200000).length / orders.length)* 100)} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 0 }}
          sm={{ span: 0 }}
          md={{ span: 0 }}
          lg={{ span: 6 }}
        >
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Customer Preview
              </h3>

              <Progress type="dashboard" percent={25} width={148} />
              <p>New Customer this Month</p>
              <Divider />
              <Statistic
                title="Active Customer"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
      <div className="whiteBox shadow">
        <div className="pad20">
          <h3 style={{ color: "#22075e", marginBottom: 5 }}>Recent Orders</h3>
        </div>

        <RecentTable data={orders.map(o => ({
          ...o,
          customerName: users.find(c => c._id === o.customerID).username
        }))} entity={"order"} dataTableColumns={dataTableOrderColumns} />
      </div>
      <div className="space30"></div>
      <div className="whiteBox shadow">
        <div className="pad20">
          <h3 style={{ color: "#22075e", marginBottom: 5 }}>Customers</h3>
        </div>
        <RecentTable data={users.filter(u => u.role === 'customer').map(u => ({...u, status: getStatusCust(u), total: getTotalOfCustomer(u)}))} entity={"customer"} dataTableColumns={dataTableCustColumns} />
      </div>
      {/* <Row gutter={[24, 24]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
         
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          
        </Col>
      </Row> */}
    </DashboardLayout>
  );
}
