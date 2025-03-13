<script>
  import "./styles.css";
  import "./scripts.js"
  import { onMount } from "svelte";
  import { readJson, StartFromSelect } from "./scripts.js";
import {
    outputTeam,
    clock,
    MLBoptions,
    NFLoptions,
    NHLoptions,
    NBAoptions,
  } from "./store.js";

  let SelectVisible = false;

  let selectedValue = -1;
  let isLoading = true; 

onMount(async () => {
try {
    readJson(selectedValue);
 } catch (err) {
throw new Error('Errore nel caricamento del JSON');
      error = err.message;
    } finally {
      isLoading = false;
	}
  });

  function DoNewTeam() {
    StartFromSelect(selectedValue);
    SelectVisible = !SelectVisible;
  }
</script>

{#if isLoading}
  <p>Loading posts...</p>
{:else }
<main>

 <div id="divSelectTeam"
style:display={SelectVisible ? "block" : "none"}> 
   <table id="SelectTeamTable">
      <tbody>
        <tr>
          <td colspan="2">
            <img
              class="link"
              src="./src/assets/close.png"
		on:click={() => (SelectVisible = !SelectVisible)}
            /></td
          >
        </tr>
        <tr>
          <td class="white">
            MLB <br />
            <select bind:value={selectedValue} on:change={DoNewTeam}>
              {#each $MLBoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
          <td class="white">
            NFL <br />
            <select bind:value={selectedValue} on:change={DoNewTeam}>
              {#each $NFLoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
        </tr>
        <tr>
          <td class="white">
            NHL <br />
            <select bind:value={selectedValue} on:change={DoNewTeam}>
              {#each $NHLoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
          <td class="white">
            NBA <br />
            <select bind:value={selectedValue} on:change={DoNewTeam}>
              {#each $NBAoptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>



<div id="logo" >

	<a
              title="Email Us"
              href="mailto:dror.m.maor@gmail.com?subject=Title Ticker"
              target="_blank"
              class="link white"
              >Email        </a>
	&nbsp; &nbsp;

 <a
              title="Buy Me A Coffee"
              href="https://ko-fi.com/drormaor"
              target="_blank"
              class="link white"
              >Coffee
            </a>
	&nbsp; &nbsp;

<a class="link white" on:click={() => (SelectVisible = !SelectVisible)}>Choose Team</a>
</div>

  <div id='ClockDiv' class="clock">
	<table>
		<tr>
			<td style='text-align:center;'>
	<div class="SmallText">It's been</div>
	 <div class="bold">{$clock.years} {$clock.years == 1 ? "Year" : "Years"}</div>
        {$clock.days} {$clock.days == 1 ? "Day" : "Days"} {$clock.hours}:{$clock.minutes}:{$clock.seconds}
			</td>
		</tr>
		<tr>
        <td class="SmallText">
            {#if $outputTeam.never == false}
              since the <span class="bold">{$outputTeam.name}</span> last played in the {$outputTeam.title} {$outputTeam.title == "Stanley Cup" ? " Finals" : ""}
            {:else}
              and the <span class="bold">{$outputTeam.name}</span> have not yet played in the {$outputTeam.title} {$outputTeam.title == "Stanley Cup" ? " Finals" : ""}
            {/if}
        </td>
		</tr>
<tr>
<td style="text-align:center;">
	<br>
	<img src="./src/assets/TeamLogos/{$outputTeam.id}.png"
	alt={$outputTeam.name} title={$outputTeam.name} />
</td>
</tr>
	</table>
  </div>


          
</main>
{/if}
