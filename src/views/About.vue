<template>
  <div style="background-color: #fff; padding: 1%">
    <table>
      <thead>
        <colgroup>
          <col span="8" width="12.5%" />
        </colgroup>
        <tr>
          <th></th>
          <th>08:30 - 10:30</th>
          <th>10:30 - 12:30</th>
          <th>12:30 - 02:30</th>
          <th>02:30 - 04:30</th>
          <th>12:30 - 02:30</th>
          <th>02:30 - 04:30</th>
          <th>04:30 - 06:30</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>احد</td>
          <td style="background-color: #ff0000">
            Machine Learning<br />د. أياد روضان<br />ق 5
          </td>
          <td style="background-color: #66ffff">
            نظرية احتسابية<br />أ.م. علاء نوري<br />ق14
          </td>
          <td style="background-color: #ec628b">
            رسوم الحاسوب والرؤيا 1<br />م علي حسن<br />ق 2
          </td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
        </tr>
        <tr>
          <td>اثنين</td>
          <td style="background-color: #00c0ff">
            رسوم الحاسوب والرؤيا 1<br />م.م.غزوة غانم<br />Net
          </td>
          <td style="background-color: #1414c0">
            صيغ البرمجة المتوازية<br />م.م. طيبة ولاء الدين<br />Net
          </td>
          <td style="background-color: #0080ff">
            معالجة مايكروية<br />م.م. مي صبري<br />C++1
          </td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
        </tr>
        <tr>
          <td>ثلاثاء</td>
          <td style="background-color: #ff0000">
            Machine Learning<br />د. أياد روضان<br />VB2
          </td>
          <td style="background-color: #408080">
            نمذجة وتحليل البرمجيات<br />م.م اسامة يونس<br />Net
          </td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
        </tr>
        <tr>
          <td>اربعاء</td>
          <td><br /></td>
          <td><br /></td>
          <td style="background-color: #408080">
            نمذجة وتحليل البرمجيات<br />م.م اسامة يونس<br />الكتروني
          </td>
          <td style="background-color: #ff6666">
            معالجة مايكروية<br />د. ميساء عبد علي<br />الكتروني
          </td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
        </tr>
        <tr>
          <td>خميس</td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
          <td style="background-color: #993333">
            تقنيات استرجاع المعلومات<br />د. مصطفى جاسم<br />الكتروني
          </td>
          <td><br /></td>
          <td><br /></td>
          <td><br /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
});
</script>
<style>
table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-left: 0;
  border-radius: 10px;
  border-spacing: 0px;
  width: 100%;
  height: 100%;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  border-collapse: separate;
}

th {
  color: black;
}

tr {
  display: table-row;
  height: 16.666666666666668%;
  vertical-align: inherit;
  border-color: inherit;
}

th,
td {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: middle;
  vertical-align: middle;
  border-left: 1px solid #ddd;
}

td {
  border-top: 1px solid #ddd;
  text-align: center;
}

thead:first-child tr:first-child th:first-child,
tbody:first-child tr:first-child td:first-child {
  border-radius: 4px 0 0 0;
}

thead:last-child tr:last-child th:first-child,
tbody:last-child tr:last-child td:first-child {
  border-radius: 0 0 0 4px;
}
</style>


