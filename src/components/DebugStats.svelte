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

  let totalCommitments,
    latestCommitment,
    firstCommitment = 0;

  function refreshData() {
    getData();
  }

  commitments.subscribe((value) => {
    let sortedCal = value;
    if (sortedCal.length > 0) {
      sortedCal = [...sortedCal].sort((a, b) => {
        compareAsc(a.date, b.date);
      });

      firstCommitment = sortedCal[0].date;
      latestCommitment = sortedCal[sortedCal.length - 1].date;
      totalCommitments = sortedCal.length;
    }
  });
</script>

<h2>Stats:</h2>
<table class="p-2 table-auto border">
  <tr
    ><td class="border font-bold p-2 text-right"> Account</td>
    <td class="border p-2"> {$account}</td></tr
  >
  <tr>
    <td class="border font-bold p-2 text-right"> S0BR Token Balance</td><td
      class="border p-2"
    >
      {$balance}
    </td></tr
  >
  <tr>
    <td class="border font-bold p-2 text-right"> Network</td><td
      class="border p-2"
    >
      {$network}
    </td>
  </tr>
  <tr>
    <td class="border font-bold p-2 text-right"> Total commitments</td><td
      class="border p-2"
    >
      {totalCommitments}
    </td>
  </tr>
  <tr>
    <td class="border font-bold p-2 text-right"> First commitment</td><td
      class="border p-2"
    >
      {firstCommitment}
    </td></tr
  >
  <tr
    ><td class="border font-bold p-2 text-right"> Latest commitment</td><td
      class="border p-2"
    >
      {latestCommitment}
    </td></tr
  >
</table>

<button
  on:click={refreshData}
  class="rounded
    shadow-lg
    hover:shadow-2xl
    transition
    duration-75
    bg-gray-300
    active:shadow
    text-gray-800
    font-bold
    py-2
    px-8
  ">Refresh</button
>
