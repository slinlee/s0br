<script>
  import { compareAsc } from "date-fns";

  import {
    account,
    commitments,
    walletConnected,
    network,
    balance,
  } from "$lib/stores.js";
  import { getData } from "$lib/s0br.js";

  let sortedCal = $commitments;
  console.table(sortedCal); // debug
  function refreshData() {
    getData();
  }

  sortedCal = [...sortedCal].sort((a, b) => {
    compareAsc(a.date, b.date);
  });

  let firstCommitment = sortedCal[0].date;
  let latestCommitment = sortedCal[-1].date;
  let totalCommitments = sortedCal.length;
</script>

<h2>Stat Details:</h2>
<ul>
  <li>Account: {$account}</li>
  <li>S0BR Token Balance: {$balance}</li>
  <li>Network: {$network}</li>
  <li>Total commitments: {totalCommitments}</li>
  <li>First commitment: {firstCommitment}</li>
  <li>Latest commitment: {latestCommitment}</li>
</ul>

<button on:click={refreshData}>Refresh</button>
