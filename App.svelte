<script>
  import "./styles.css";
  import "./scripts.js";
  import { onMount } from "svelte";
  import {
    outputTeam,
    clock,
    MLBoptions,
    NFLoptions,
    NHLoptions,
    NBAoptions,
  } from "./store.js";

  let SelectVisible = false;

  let selectedValue = 0;

  onMount(async () => {
    readJson(selectedValue);
  });

  function DoNewTeam() {
    StartFromSelect(selectedValue);
    SelectVisible = !SelectVisible;
  }
</script>

<main>
  <img
    style:display={SelectVisible ? "none" : "block"}
    src="./src/assets/TeamLogos/{$outputTeam.id}.png"
    alt={$outputTeam.name}
    id="logo"
    class="link"
    title="Change Team"
    onclick={(SelectVisible = !SelectVisible)}
  />

  <div id="divSelectTeam" style:display={SelectVisible ? "block" : "none"}>
    <table id="SelectTeamTable">
      <tbody>
        <tr>
          <td colspan="2">
            <img
              class="link"
              src="./src/assets/close.png"
              onclick={(SelectVisible = !SelectVisible)}
            /></td
          >
        </tr>
        <tr>
          <td>
            MLB <br />
            <select bind:value={selectedValue} onchange={DoNewTeam()}>
              {#each $MLBoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
          <td>
            NFL <br />
            <select bind:value={selectedValue} onchange={DoNewTeam()}>
              {#each $NFLoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            NHL <br />
            <select bind:value={selectedValue} onchange={DoNewTeam()}>
              {#each $NHLoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
          <td>
            NBA <br />
            <select bind:value={selectedValue} onchange={DoNewTeam()}>
              {#each $NBAoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="MainTeamClock">
    <table class="centerTable">
      <tbody>
        <tr>
          <td class="clock">It's been</td>
          <td class="clock bold">
            <span>{$clock.years}</span>
            {$clock.years == 1 ? "Year" : "Years"},
          </td>
          <td class="clock"
            ><span>{$clock.days}</span> {$clock.days == 1 ? "Day" : "Days"},</td
          >
          <td class="clock">
            {$clock.hours}:{$clock.minutes}:{$clock.seconds}
          </td>
        </tr>
      </tbody>
    </table>

    <table class="centerTable">
      <tbody>
        <tr>
          <td id="lastTime">
            {console.log($outputTeam.never)}
            {#if $outputTeam.never == false}
              ... since the {$outputTeam.name} last played in the {$outputTeam.title}
            {:else}
              ... and the {$outputTeam.name} have not yet played in the {$outputTeam.title}
            {/if}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div id="menu">
    <table>
      <tbody>
        <tr>
          <td>
            <a
              title="Email Us"
              href="mailto:dror.m.maor@gmail.com?subject=Title Ticker"
              target="_blank"
              class="link td"
              ><img alt="Email Us" src="./src/assets/email.png" />
            </a>
          </td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>
            <a
              title="Buy Me A Coffee"
              href="https://ko-fi.com/drormaor"
              target="_blank"
              class="link td"
              ><img alt="Buy Me A Coffe" src="./src/assets/coffee.png" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
