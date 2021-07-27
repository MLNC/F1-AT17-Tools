import { useEffect } from "react";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Comp from "./components/Comp";
import ShipPoints from "./utils/ShipPoints";
import { CompType, ShipType } from "./utils/types";

// Dummy data
const dummyShip1: ShipType = {
  shipId: 1,
  name: "Golem",
  points: 24,
  hullType: "Battleship",
  fitting: "",
};
const dummyShip2: ShipType = {
  shipId: 2,
  name: "Golem",
  points: 24,
  hullType: "Battleship",
  fitting: "",
};
const dummyShip3: ShipType = {
  shipId: 3,
  name: "Golem",
  points: 24,
  hullType: "Battleship",
  fitting: "bb",
};
const dummyShip4: ShipType = {
  shipId: 4,
  name: "Golem",
  points: 24,
  hullType: "Battleship",
  fitting: "aa",
};
const dummyComp: CompType = {
  compId: 1,
  compName: "compName",
  ships: [dummyShip1, dummyShip2, dummyShip3],
  note: "notes here",
  isConfirmed: false,
};

const dummyConfirmedComp: CompType = {
  compId: 2,
  compName: "compName2",
  ships: [dummyShip1, dummyShip2, dummyShip3, dummyShip4],
  note: "notes here2",
  isConfirmed: true,
};

const dummyCompList = [dummyComp, dummyConfirmedComp];
// Dummy data

function App() {
  const [adminPassword, setAdminPassword] = useState("");
  const [compList, setCompList] = useState(dummyCompList);

  useEffect(() => {
    let ships: Array<ShipType> = [];
    for (let i = 0; i < 10; i++) {
      ships.push(ShipPoints[0] as ShipType);
    }
    const newComp = {
      compId: -1,
      compName: "newComp",
      ships: ships,
      isConfirmed: false,
      note: "",
    };
    setCompList([...compList, newComp]);
  }, []);

  const updateComp = (oldCompId: number, newComp: CompType) => {
    const filteredCompList = compList.filter(
      (comp) => comp.compId != oldCompId
    );
    setCompList([newComp, ...filteredCompList]);
  };

  return (
    <div>
      <div style={{ fontWeight: "bold", backgroundColor: "pink" }}>
        <h1>有问题找Orca，老老实实用，不要搞歪门邪道</h1>
        <div style={{ paddingBottom: "3rem" }}>
          正确填写才进行某些操作 Admin Password:
          <input
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          />
        </div>
        <h2 style={{ paddingBottom: "1rem" }}>多用Ctril+F搜索</h2>
      </div>
      <Calendar></Calendar>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <h1>新增阵容</h1>
          {compList
            .filter((comp) => comp.compId === -1)
            .map((comp) => (
              <Comp
                key={-1}
                comp={comp}
                isEditing={true}
                updateComp={updateComp}
              />
            ))}

          <h1>待定阵容</h1>
          {compList
            .filter((comp) => !comp.isConfirmed && comp.compId !== -1)
            .map((comp) => (
              <Comp
                key={comp.compId}
                comp={comp}
                isEditing={false}
                updateComp={updateComp}
              />
            ))}
        </div>
        <div>
          <h1>确认阵容</h1>
          {compList
            .filter((comp) => comp.isConfirmed && comp.compId !== -1)
            .map((comp) => (
              <Comp
                key={comp.compId}
                comp={comp}
                isEditing={false}
                updateComp={updateComp}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
