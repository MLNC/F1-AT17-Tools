import { useState } from "react";
import Ship from "./Ship";
import { CompType, ShipType } from "../utils/types";
import { API } from "aws-amplify";
import { updateComp } from "../graphql/mutations";
import { useEffect } from "react";

interface CompProps {
  comp: CompType;
  isEditing: boolean;
  adminPassword: string;
  createNewComp?: (newComp: CompType) => void;
}

const adminPassword = "IWantATShips";

function Comp(props: CompProps) {
  const [comp, setComp] = useState<CompType>(props.comp);
  const [isEditing, setIsEditing] = useState(props.isEditing);

  const updateShip = (idx: number, newShip: ShipType) => {
    const newShips = comp.ships;
    newShips.splice(idx, 1, newShip);
    setComp({ ...comp, ships: [...newShips] });
  };

  const updateCurrComp = async () => {
    await API.graphql({
      query: updateComp,
      variables: {
        input: {
          id: comp.id,
          compId: comp.compId,
          compName: comp.compName,
          ships: comp.ships,
          isConfirmed: comp.isConfirmed,
          note: comp.note,
        },
      },
    });
    window.location.reload();
  };

  const confirmCurrComp = async (flag: boolean) => {
    if (adminPassword === props.adminPassword) {
      await API.graphql({
        query: updateComp,
        variables: {
          input: {
            id: comp.id,
            compId: comp.compId,
            compName: comp.compName,
            ships: comp.ships,
            isConfirmed: flag,
            note: comp.note,
          },
        },
      });
      window.location.reload();
    } else {
      alert("Admin Password错误");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <table>
        <tbody>
          <tr>
            <th colSpan={6} style={{ fontSize: "20px" }}>
              <span style={{ marginRight: "1rem" }}>No.{comp.compId}</span>
              <input
                value={comp.compName}
                disabled={comp.isConfirmed || !isEditing}
                onChange={(e) => {
                  setComp({ ...comp, compName: e.target.value });
                }}
                placeholder="阵容名称"
              ></input>
            </th>
          </tr>
          <tr>
            <th colSpan={6}>
              <textarea
                value={comp.note}
                disabled={comp.isConfirmed || !isEditing}
                style={{ fontSize: "15px", width: "100%", resize: "vertical" }}
                onChange={(e) => {
                  setComp({ ...comp, note: e.target.value });
                }}
                placeholder="这里多少写点东西"
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

          {comp.ships.map((ship, idx) => (
            <Ship
              key={ship?.shipName + idx}
              idx={idx}
              ship={ship}
              isConfirmed={comp.isConfirmed}
              updateShip={updateShip}
              disabled={!isEditing}
            ></Ship>
          ))}
          <tr>
            <th></th>
            <th>Total</th>
            <th>
              {comp.ships.reduce((carrier, ship) => carrier + ship.points, 0)}
            </th>
          </tr>
        </tbody>
      </table>
      {comp.isConfirmed ? (
        <button
          style={{ width: "100%", padding: "1rem" }}
          onClick={() => confirmCurrComp(false)}
        >
          回到待定(admin)
        </button>
      ) : (
        <div>
          {isEditing ? (
            comp.compId === -1 ? (
              <button
                style={{ width: "100%", padding: "1rem" }}
                onClick={() => {
                  setIsEditing(false);
                  if (props.createNewComp) {
                    props.createNewComp(comp);
                  }
                }}
              >
                上传阵容
              </button>
            ) : (
              <button
                style={{ width: "100%", padding: "1rem" }}
                onClick={() => {
                  setIsEditing(false);
                  updateCurrComp();
                }}
              >
                确认修改
              </button>
            )
          ) : (
            <button
              style={{ width: "100%", padding: "1rem" }}
              onClick={() => setIsEditing(true)}
            >
              修改阵容
            </button>
          )}
          {comp.compId !== -1 && (
            <button
              style={{ width: "100%", padding: "1rem" }}
              onClick={() => confirmCurrComp(true)}
            >
              移到右边(admin)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Comp;
