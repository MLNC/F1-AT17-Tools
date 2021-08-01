import { useEffect } from "react";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Comp from "./components/Comp";
import { API } from "aws-amplify";
import ShipPoints from "./utils/ShipPoints";
import { CompType, ShipType } from "./utils/types";
import { listComps } from "./graphql/queries";
import { createComp } from "./graphql/mutations";

function App() {
  const [adminPassword, setAdminPassword] = useState("");
  const [compList, setCompList] = useState<Array<CompType>>([]);

  useEffect(() => {
    fetchComps();
  }, []);

  const fetchComps = async () => {
    const apiData: any = await API.graphql({ query: listComps });
    setCompList(apiData.data.listComps.items);
  };

  const createNewComp = async (newComp: CompType) => {
    await API.graphql({
      query: createComp,
      variables: {
        input: {
          compId: getNextCompId(),
          compName: newComp.compName,
          ships: newComp.ships,
          isConfirmed: false,
          note: newComp.note,
        },
      },
    });
    window.location.reload();
  };

  // const updateComp = async (oldCompId: number, newComp: CompType) => {
  //   const filteredCompList = compList.filter(
  //     (comp) => comp.compId !== oldCompId
  //   );
  //   setCompList([newComp, ...filteredCompList]);
  // };

  const generateNewComp = () => {
    let ships: Array<ShipType> = [];
    for (let i = 0; i < 10; i++) {
      ships.push(ShipPoints[0] as ShipType);
    }
    const newComp = {
      id: "newComp",
      compId: -1,
      compName: "newComp",
      ships: ships,
      isConfirmed: false,
      note: "",
    };
    return newComp;
  };

  const getNextCompId = () => {
    return compList.length === 0
      ? 0
      : compList
          .map((comp) => comp.compId)
          .reduce((carrier, curr) => (carrier = Math.max(carrier, curr, 0))) +
          1;
  };

  return (
    <div>
      <div style={{ fontWeight: "bold", backgroundColor: "pink" }}>
        <h1>老老实实用，不要搞歪门邪道，发现BUG或者有问题直接找Orca</h1>
        <h2 style={{ paddingBottom: "1rem" }}>多用Ctril+F搜索</h2>
        <div style={{ paddingBottom: "3rem" }}>
          正确填写才进行某些操作 Admin Password:
          <input
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <Calendar adminPassword={adminPassword}></Calendar>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <h1>新增阵容</h1>
          <hr />
          <Comp
            key={-1}
            comp={generateNewComp()}
            isEditing={true}
            adminPassword={adminPassword}
            createNewComp={createNewComp}
          />
          {/* {compList
            .filter((comp) => comp.compId === -1)
            .map((comp) => (
              <Comp
                key={-1}
                comp={comp}
                isEditing={true}
                // updateComp={updateComp}
                adminPassword={adminPassword}
              />
            ))} */}

          <h1>待定阵容</h1>
          <hr></hr>
          {compList
            .sort((comp1, comp2) => comp2.compId - comp1.compId)
            .filter((comp) => !comp.isConfirmed && comp.compId !== -1)
            .map((comp) => (
              <Comp
                key={comp.compId}
                comp={comp}
                isEditing={false}
                adminPassword={adminPassword}
              />
            ))}
        </div>
        <div>
          <h1>确认阵容</h1>
          <hr></hr>
          {compList
            .filter((comp) => comp.isConfirmed && comp.compId !== -1)
            .map((comp) => (
              <Comp
                key={comp.compId}
                comp={comp}
                isEditing={false}
                adminPassword={adminPassword}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
