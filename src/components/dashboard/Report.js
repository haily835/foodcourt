import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import Chart from "./Chart";
import Container from "@material-ui/core/Container";
import Deposits from "./Deposits";
import Grid from "@material-ui/core/Grid";
import ItemMenuChart from "./ItemMenuChart";
import ItemRatingChart from "./ItemRatingChart";
import Orders from "./Orders";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Report() {
  // styling
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const itemChartStyle = clsx(classes.itemChart);
  // items data
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState();
  const [currItemId, setCurrItemId] = useState("");
  const abortController = new AbortController();
  const [isReportUnMount, setReportUnMount] = useState(false);
  // state of the report to pdf
  const [sevenDaysPeriod, setSevenDaysPeriod] = useState([]);
  const [ratingData, setRatingData] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const result = await axios.get("https://foodcourt-backend.herokuapp.com/items/", {
        signal: abortController.signal,
      });
      if (!isReportUnMount) {
        setItems(result.data);
        setCurrentItem(result.data[0]);
      }
    };
    loadData();

    // clean up
    return () => {
      setReportUnMount(true);
    };
  }, []);

  const createAndDownloadPdf = () => {
    axios
      .post("https://foodcourt-backend.herokuapp.com/create-pdf", {
        sevenDaysPeriod: sevenDaysPeriod,
        items: items,
      })
      .then(() =>
        axios.get("https://foodcourt-backend.herokuapp.com/ofetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "report.pdf");
      });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart handlePrint={setSevenDaysPeriod} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Item chosing */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <ItemMenuChart items={items} chooseItemHandle={setCurrentItem} />
          </Paper>
        </Grid>
        {/* Item rating */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <ItemRatingChart item={currentItem} />
          </Paper>
        </Grid>
        {/* Export Pdf */}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={createAndDownloadPdf}>
            Download Pdf
          </Button>
        </Grid>
        {/* Recent Orders */}
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
}
