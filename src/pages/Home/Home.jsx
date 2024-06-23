import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Home.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CoinContext } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { allcoin, currency } = useContext(CoinContext);
  const gridRef = useRef();
  const navigate = useNavigate();
  const [colDefs, setColDefs] = useState([
    { field: "market_cap_rank", headerName: "#", minWidth: 50 },
    {
      field: "name",
      headerName: "Coins",
      minWidth: 300,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={params.data.image} alt="coin logo" width={"30px"} />
          <p>{params.data.name + " " + params.data.symbol} </p>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 200,
      valueFormatter: (p) =>
        currency.symbol + " " + p.data.current_price.toLocaleString(),
    },
    {
      field: "price_change_percentage_24h",
      headerName: "24H Change",
      minWidth: 200,
      cellRenderer: (p) => {
        return (
          <div
            style={{
              color: p.data.price_change_percentage_24h < 0 ? "red" : "green",
            }}
          >
            {(
              Math.floor(p.data.price_change_percentage_24h * 100) / 100
            ).toLocaleString() + "%"}
          </div>
        );
      },
    },
    {
      field: "market_cap",
      headerName: "Market Cap",
      type: "rightAligned",
      minWidth: 300,
      valueFormatter: (p) => p.data.market_cap.toLocaleString(),
    },
  ]);

  const defaultColDef = {
    flex: 1,
  };
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    navigate(`/coin/${selectedRows[0].id}`);
  }, []);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest
          <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the largest Cryptocurrency marketplace.
          <br /> Sign up to explore more cryptos
        </p>
        <form>
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            id="filter-text-box"
            onChange={onFilterTextBoxChanged}
          />
          <button>Search</button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          className={"ag-theme-quartz"}
          style={{ width: "70%", height: "100vh" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={allcoin}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
