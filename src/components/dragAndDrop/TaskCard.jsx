import React from "react";
import { Card, Badge, Avatar, Typography, Grid, Row, Col, Button } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { MoreOutlined, BellOutlined } from "@ant-design/icons";

const { Meta } = Card;

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            style={{ width: 300, margin: "8px 1px" }}
            actions={[
              <Badge count={4} key="badge">
                <BellOutlined />
              </Badge>,
              <Button icon={<MoreOutlined />} key="more" type="link" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar style={{ backgroundColor: "#2C5CC9" }}>
                  {item.assigned_To.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={
                <Typography.Title level={5} style={{ marginBottom: 0 }}>
                  {item.assigned_To}
                </Typography.Title>
              }
              description={item.task}
            />
            <Grid style={{ marginTop: "20px" }}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Typography.Text>Assignee</Typography.Text>
                  <Typography.Text strong>{item.assignee}</Typography.Text>
                </Col>
                <Col span={8}>
                  <Typography.Text>Priority</Typography.Text>
                  <Typography.Text strong>{item.priority}</Typography.Text>
                </Col>
                <Col span={8}>
                  <Typography.Text>Due Date</Typography.Text>
                  <Typography.Text strong>{item.due_Date}</Typography.Text>
                </Col>
              </Row>
            </Grid>
            <Button
              size="small"
              style={{
                marginTop: 16,
                background: "#EEFFF3",
                color: "#1CA13E",
                border: "none",
              }}
            >
              Qty:7
            </Button>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
