import React from "react";
import MapContainer from "./MapContainer.js";
import {Button, Input} from "antd";

const HistoryType: React.FC = () =>{

  const onSearch = () =>{

  }

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ marginRight: 20, display: 'inline-block' }}>历史轨迹查询:</p>
            <Input.Search
                placeholder="请输入设备名或设备编号 "
                onSearch={onSearch}
                enterButton
                style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            />
          </div>
        </div>
        <MapContainer ></MapContainer>
      </div>

  )
};
export default HistoryType;
