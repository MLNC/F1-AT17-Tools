import { useState } from "react";
import Ship from "./Ship";
import { CompType, ShipType } from "../utils/types";

interface CompProps {
  comp: CompType;
  isEditing: boolean;
  updateComp: (oldCompId: number, newComp: CompType) => void;
}

function Comp(props: CompProps) {
  const [isEditing, setIsEditing] = useState(props.isEditing);

  const updateShip = (idx: number, newShip: ShipType) => {
    const newShips = props.comp.ships;
    newShips.splice(idx, 1, newShip);

    props.updateComp(props.comp.compId, {
      ...props.comp,
      ships: [...newShips],
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <table>
        <tbody>
          <tr>
            <th colSpan={6} style={{ fontSize: "20px" }}>
              <span style={{ marginRight: "1rem" }}>
                No.{props.comp.compId}
              </span>
              <input
                value={props.comp.compName}
                disabled={props.comp.isConfirmed || !isEditing}
                onChange={(e) => {
                  props.updateComp(props.comp.compId, {
                    ...props.comp,
                    compName: e.target.value,
                  });
                }}
              ></input>
            </th>
          </tr>
          <tr>
            <th colSpan={6}>
              <textarea
                value={props.comp.note}
                disabled={props.comp.isConfirmed || !isEditing}
                style={{ fontSize: "15px", width: "100%", resize: "vertical" }}
                onChange={(e) => {
                  props.updateComp(props.comp.compId, {
                    ...props.comp,
                    note: e.target.value,
                  });
                }}
              ></textarea>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Ship Name</th>
            <th>Points</th>
            <th>Hull Type</th>
            <th>Fitting</th>
          </tr>

          {props.comp.ships.map((ship, idx) => (
            <Ship
              key={ship?.name + idx}
              idx={idx}
              ship={ship}
              isConfirmed={props.comp.isConfirmed}
              updateShip={updateShip}
            ></Ship>
          ))}
          <tr>
            <th></th>
            <th>Total</th>
            <th>
              {props.comp.ships.reduce(
                (carrier, ship) => carrier + ship.points,
                0
              )}
            </th>
          </tr>
        </tbody>
      </table>
      {props.comp.isConfirmed ? (
        <button style={{ width: "100%", padding: "1rem" }}>
          回到待定(admin)
        </button>
      ) : (
        <div>
          {isEditing ? (
            <button
              style={{ width: "100%", padding: "1rem" }}
              onClick={() => {
                setIsEditing(false);
                // TODO API
              }}
            >
              上传阵容
            </button>
          ) : (
            <button
              style={{ width: "100%", padding: "1rem" }}
              onClick={() => setIsEditing(true)}
            >
              修改阵容
            </button>
          )}
          <button style={{ width: "100%", padding: "1rem" }}>
            移到右边(admin)
          </button>
        </div>
      )}
    </div>
  );
}

export default Comp;
