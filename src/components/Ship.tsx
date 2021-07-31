import Select from "react-dropdown-select";
import ShipPoints from "../utils/ShipPoints";
import { ShipType } from "../utils/types";
import ReactModal from "react-modal";
import { useState } from "react";

interface ShipProps {
  idx: number;
  isConfirmed: boolean;
  ship: ShipType;
  updateShip: (idx: number, newShip: ShipType) => void;
  disabled?: boolean;
}

ReactModal.setAppElement("#root");

function Ship(props: ShipProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fitting, setFitting] = useState(props.ship.fitting);

  return (
    <tr>
      <ReactModal isOpen={isModalOpen}>
        <div style={{ display: "flex", height: "70%", margin: "2rem " }}>
          <textarea
            style={{ width: "70%", height: "100%", resize: "vertical" }}
            value={fitting}
            onChange={(e) => setFitting(e.target.value)}
          ></textarea>
          <button
            style={{ margin: "1rem", fontSize: "2rem" }}
            onClick={() => {
              props.updateShip(props.idx, { ...props.ship, fitting: fitting });
              setIsModalOpen(false);
            }}
          >
            确认修改
          </button>
          <button
            style={{ margin: "1rem", fontSize: "2rem" }}
            onClick={() => setIsModalOpen(false)}
          >
            取消修改
          </button>
        </div>
      </ReactModal>
      <td style={{ textAlign: "center" }}>{props.idx + 1}</td>
      <td>
        <Select
          options={ShipPoints}
          labelField="shipName"
          valueField="shipName"
          values={props.ship ? [props.ship] : []}
          onChange={(v) => {
            if (v.length !== 0) {
              props.updateShip(props.idx, v[0]);
            } else {
              props.updateShip(props.idx, ShipPoints[0]);
            }
          }}
          multi={false}
          disabled={props.isConfirmed || props.disabled}
        />
      </td>
      <td style={{ textAlign: "center" }}>{props.ship?.points}</td>
      <td style={{ textAlign: "center" }}>{props.ship?.hullType}</td>
      <td style={{ textAlign: "center" }}>
        {!props.isConfirmed && (
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={props.disabled}
          >
            {props.ship.fitting ? "编辑" : "添加"}
          </button>
        )}
        <button
          disabled={props.ship.fitting === ""}
          onClick={() => navigator.clipboard.writeText(fitting)}
        >
          复制
        </button>
      </td>
    </tr>
  );
}

export default Ship;
