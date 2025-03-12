import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { getCookieValue } from "../App";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activeTab") || "dashboard"
  );
  const navigateTo = useNavigate();
  useEffect(() => {
    const admin_token = getCookieValue("admin_token");
    if (!admin_token) {
      navigateTo("/signin");
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);
  return (
    <div className="sidebar z-3">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px", height: "100vh" }}
      >
        <Link
          to="/"
          className="d-flex justify-content-center align-items-center text-white"
          onClick={() => setActiveTab("dashboard")}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfcAAAMnCAYAAAAj1BshAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB5YSURBVHgB7d1Ncht3muDhNxMuTY9r0ey9yyZ2MmtRrBMUdYK2TyDqBLb3E2bSMXvLJ5B0ArtOIOkE4ixEawdIqohZNitiwlHhKmZOgrLctkyQAIiPzBfPE2EDJCH5g8z86f1nIrMIIJ3bo2r3vfeK/6yb+iCa2C8idpr2r/bxrH0cRxHjsiif1P9qnp4Oq5MAUikCSGNvVB0Wg+Zu08TBHL/spBiU959/cPQogBTEHRJoJ/WDwaA5mjPq7xrXdXHnxbAaB9BrZQC99vHr48/Ksnl8w7BP7La/z2jv9ZdHAfSauEOP7b0+Pirq+n4sU11UAg/9ZlkeemoS9qjrKlalbKrTP3x1HEDviDv00MrD/pbAQy+JO/TM2sL+lsBD74g79Mjaw/6WwEOviDv0xMbC/pbAQ2+IO/TAxsP+lsBDL4g7dNwfXx193TTxeXSFwEPniTt02N6rowfRxGF0TFHEw+cfHt8LoJPEHTqqq2F/S+Chu8QdOqjrYX9L4KGbxB06pi9hf0vgoXvEHTqkb2F/S+ChW8QdOmB3VO28P2i+7mPY35oE/nfnxRcnw+osgI0Sd9iwi7CXzeP26X7038mturgj8LBZ4g4blCzsbwk8bJi4w4YkDftbAg8bJO6wAcnD/pbAw4aIO6zZloT9LYGHDSgDWJstC/vE/o/tf+/tUbUbwNqY3GFNJoEr34R9N7bPuG4n+BfDahzAyok7rMGWh/0tgYc1EXdYMWH/FYGHNRB3WCFhv5TAw4qJO6yIsF9J4GGFxB1WQNhnIvCwIuIOSybscxF4WAFxhyUS9oUIPCyZuMOSCPuNCDwskbjDEgj7Ugg8LIm4ww0J+1IJPCyBuMMNCPtKCDzckLjDgvZG1X7Rhr2J2AmW7SzawJ8Oq5MA5ibusABhXwuBhwWJO8xJ2NdK4GEB4g5zEPaNEHiYk7jDjIR9owQe5lAGcK3bo+pA2DdqJ9r//5M/YAVwLXGHa9z+2/HdUti7YBL4Z5PvRwBXsiwPV7gI+3n9MOiUelAevvjg6FEAlxJ3mELYu03gYTpxh0sIez8IPFxO3OEdwt4vAg+/5YQ6+AVh75/J9+vjl9XnAfxM3OEne6+Pj4S9n4povt57/eVRABcsy0O8CXvUdRX0W9lUp3/46jhgy4k7W0/YkxF4EHe2m7AnJfBsOXFnawl7cgLPFhN3tpKwbwmBZ0uJO1tH2LeMwLOFxJ2tIuxbSuDZMuLO1hD2LSfwbBFxZysIOxcEni0h7qQn7PyKwLMFxJ3UhJ1LCTzJiTtp7b06ehBNHAZcoiji4fMPj+8FJCTupCTszELgyUrcSUfYmYfAk5G4k4qwswiBJxtxJw1h5yYEnkzEnd7bHVU77w+ar4WdmxJ4shB3eu0i7GXzuH26H7AcJ7fq4s7JsDoL6Clxp7eEnRUSeHpN3OklYWcNBJ7eEnd6R9hZI4Gnl8SdXhF2NkDg6R1xpzeEnQ0SeHpF3OmF26Nqt3wT9t2AzRjXbeBfDKtxQMeJO50n7HSIwNML4k6nCTsdJPB0nrjTWcJOhwk8nSbudJKw0wMCT2eJO50j7PSIwNNJ4k6nCDs9JPB0jrjTGcJOjwk8nSLudIKwk4DA0xnizsYJO4kIPJ0g7myUsJOQwLNx4s7GCDuJCTwbJe5sxN6o2i/asDcROwE5nUUb+NNhdRKwZuLO2gk7W0Tg2QhxZ62EnS0k8KyduLM2ws4WE3jWStxZC2EHgWd9xJ2VE3b4mcCzFmXACt3+2/HdKJtnwg4Xdibbw8V2AStkcmdlJjuw8rx+GMBv1IPy8MUHR48CVkDcWQlhh+sJPKsi7iydsMPsBJ5VEHeWSthhfgLPsok7SyPssDiBZ5mcLc9S7L0+PhJ2WNxk+9l7/eVRwBKY3LmxSdijrqsAbq5sqtM/fHUccAPizo0IO6yAwHND4s7ChB1WSOC5AXFnIcIOayDwLEjcmZuwwxoJPAsQd+Yi7LABAs+cxJ2ZCTtskMAzB3FnJsIOHSDwzEjcuZawQ4cIPDMQd64k7NBBAs81xJ2phB06TOC5grhzqb1XRw+iicMAOqso4uHzD4/vBbxD3PkNYYf+EHguI+78irBD/wg87xJ3fibs0F8Czy+JOxeEHfpP4HlL3BF2SETgmRD3LbY7qnbeL5vH7dP9ADI5uVUXd06G1VmwlcR9Swk7pCfwW0zct5Cww9YQ+C0l7ltG2GHrCPwWEvctIuywtQR+y4j7lhB22HoCv0XEfQvcHlW75Zuw7wawzcZ1G/gXw2ocpCbuyQk78A6B3wLinpiwA1MIfHLinpSwA9cQ+MTEPSFhB2Yk8EmJezLCDsxJ4BMS90SEHViQwCcj7kkIO3BDAp+IuCcg7MCSCHwS4t5zwg4smcAnIO49JuzAigh8z4l7Twk7sGIC32Nl0Dt7o2p/UDbPQtiB1bkYICb7m6B3TO49M9nQinaDayJ2AmD1zqKd4E+H1UnQG+LeI8IObIjA94y494SwAxsm8D0i7j0g7EBHCHxPiHvHCTvQMQLfA86W77Dbfzu+K+xAx+xE2Tyb7J+CzjK5d9RkwynP64cB0FH1oDx88cHRo6BzxL2DhB3oC4HvJnHvGGEH+kbgu0fcO0TYgb4S+G4R944QdqDvBL47nC3fAXuvj4+EHei7yX5s7/WXR8HGmdw3bBL2qOsqALIom+r0D18dBxsj7hsk7EBaAr9R4r4hwg6kJ/AbI+4bIOzA1hD4jRD3NRN2YOsI/NqJ+xoJO7C1BH6txH1NhB3YegK/NuK+BsIO8BOBXwtxXzFhB3iHwK+cuK+QsANMIfArJe4rIuwA1xD4lRH3Fdh7dfQgmjgMAK5UFHH/+YfHXwRLJe5LJuwA82kD/7AN/L1gacR9iYQdYDECv1ziviTCDnAzAr884r4Ewg6wHAK/HOJ+Q8IOsFwCf3PivqDdUbXz+0HzbdPEQQCwbCe36uLOybA6C+Ym7guYhP39snncPt0PAFZF4Bck7nMSdoC1EvgFiPschB1gIwR+TuI+I2EH2CiBn4O4z0DYATpB4Gck7te4Pap2yzdh3w0ANm1ct4F/MazGwVTifgVhB+gkgb+GuE8h7ACdJvBXEPdLCDtALwj8FOL+DmEH6BWBv4S4/4KwA/SSwL9D3H8i7AC9JvC/IO4h7ABJCPxPtj7uwg6QisDHlsdd2AFS2vrAb23chR0gta0O/FbGXdgBtsLWBr6MLbM3qvYHZfMshB0gu4tBbrLfjy2zVZP75BtctN/oJmInANgWZ9FO8KfD6iS2xNbEXdgBttpWBX4r4i7sAMQWBT593IUdgF/YisCnjruwA3CJ9IFPe7b87b8d3xV2AC6xE20fJp2IpFJO7pNvWHlePwwAuEI9KA9ffHD0KJJJF3dhB2AeGQOfKu7CDsAisgU+TdyFHYCbyBT4FHEXdgCWIUvge3+2/Mevjz8TdgCWYdKTvddfHkXP9True6+Pj4q6vh8AsCx1UfU98L1dlp+EPeq6CgBYhbKpTv/w1XH0UC/jLuwArEVPA9+7uAs7AGvVw8D3Ku7CDsBG9CzwvYm7sAOwUT0KfC/iLuwAdEJPAt/5uAs7AJ3Sg8B3Ou7CDkAndTzwnY27sAPQaR0OfCfjLuwA9EJHA9+5uO+9OnoQTRwGAPRAUcT95x8efxEd0qm4CzsAfdQG/mEb+HvREZ2Ju7AD0GddCnwn4i7sAGTQlcBvPO7CDkAmXQj8RuMu7ABktOnAbyTuu6Nq5/eD5tumiYMAgITawD/53Xnx6cmwOos1W3vcJ2F/v2wet0/3AwByO7lVF3fWHfi1xl3YAdhCaw/82uIu7ABssbUGfi1xF3YAWF/gVx53YQeAn60l8GWs0O1RtSvsAPCz/R/L5tmkj7FCK5vcJ//i5Zuw7wYA8Evjup3gXwyrcazASuIu7ABwrZUFfulxF3YAmNlKAr/UuAs7AMxt6YFfWtyFHQAWttTALyXuwg4AN7a0wN847sIOAEuzlMDfKO7CDgBLd+PALxx3YQeAlblR4BeKu7ADwMotHPi54y7sALA2CwV+rmvL742qfWEHgLW5GKgn/Z3nF808uU9+46L9BzQROwEArNNZtBP86bA6meXFM8Vd2AFg42YO/LVxF3YA6IyZAn9l3IUdADrn2sBPjbuwA0BnXRn4S8+Wv/2347vCDgCdtRNtpz8e/a9PLvvibyb3i9Pty+ZZAACdVw/KwxcfHD365ed+FXcXqAGA3jmr6+LPv7zQza+W5YUdAHpn56d+/+znuLfL8Ych7ADQR7t7L7+s3n7w35N72RwFANBTxWf7o+riRPiLuJvaAaD3dn4s688nT95M7qZ2AEig+Ozi7976BgB5TG4RWzZlHAQAkEJZ1gdlUTR/CQAghSbK/bJwiVkASKOI5k9l0zhLHgAS2Z2cLb8bAEAak7ifBQCQhrgDQDLiDgC5nLRxL54GAJBCE8XLMuo4CQAgiyflrYjvAgBIoajbuJ8Mq7OiiCcBAPTdyemwOrm4K9z5eXEcAECvFYPy/sXj20/88dXR46ZxExkA6Knx6UfHw8mT8u1nTO8A0F/t1F69ff5z3F8Mqyftl74JAKBfiuLh8w+OHr39sPzl104/qj5vH7w1DgD6Y/zDeXzxy0+U776irotPJy8MAKDrxm2374yH1a+uNltc9srbo2q3LJvH4Y5xANBVF2FvD6uP3/1CedmrJy+8VRd/dgweADqoKZ7+0Hb6srBPFNf9+r1RdRhlcxSmeADYqDbaZ+20fvz9sLp/zetmI/IAsBmTqDd18c0PEfffPb4+5fXzaY/HHxRl/UnRlAdRNH8KAGD5muZllOXj+jwe/SPiZJaovzV33N81OfkuTPO9VZaTqxJerMgAHTU5aSrYGmU7pbcT+niemL/rxnGn33463PIggM46/ejYvpq5lAEApCLuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4A0Ay4g4AyYg7ACQj7gCQjLgDQDLiDgDJiDsAJCPuAJCMuANAMuIOAMmIOwAkI+4AkIy4b7nBIM4CgFTEfcsNzuNJAJCKuG+5k2E1mdzHAUAa4k6r+GsAXeXQGXMTd6Ku47sAukrcmZu4Ey+G1ZOwA4Gusm0yN3HnJ8U3AXRP0/w9YE7izoVbddwPoHvKchQwJ3HnwuSs+SaaRwF0SxMvA+Yk7vysqcsqHN+DThnUcRIwJ3HnZy+G1dixd+iWc9ehYAFFwDv2Xh49ax/2A9i404+O7aeZm8md36jr4tOwPA+b1zRPAxYg7vzGZHm+qYvjADaqKUoXmGIh4s6lvh9W90PgYaOK2o2dWIxjOVxpb1RVUTZHAazbuD3ePgxYgMmdK50O27ib4GHtisHFW1NhISZ3ZvLxqPq8KJuvA1gHUzs3YnJnJpNj8HVdTHY24wBWytTOTYk7M5ucRX+rLv7sQjewQk3x9PkHRy4FzY1Ylmcht0fV7mAQD5qmOQhgWcbtCtmdN1eLhMWJOzfSRv6gKOvDIoq7AdyEsLM04s5STCb59hjPQTGIu6Z5mF27Ez5r6uKbHyLuj4eVK0OyFOLO0u2Oqp1/i9gvyzhof8L+1P6Q7QTws+bN5Z3P4vz86Q8x+E7UAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGB+RcAK7I6qnffbhyb+tVtEsRPAr9QxGE8e/xFxMh5WZwFLJO4sze1RdVAMmv8smvik/XA3gFmdtHvjk/q8ePRiWD0JuCFx58b2RtVhG/W7TRMHAdzUuBiU1fMPjh4FLEjcWdhkUi/L5uv26X4Ayzau6+JOO8mPA+ZUBizg49fHn7VhfxzCDquy225jo73XXx4FzMnkztz2Xh09iCYOA1iLooiHzz88vhcwI3FnLsIOmyHwzMOyPDPbe318JOywGU277f3x1dHXATMwuTOTyRnxUTYPAtiopj7/9Pvh//4u4ArizrUuLkhTNs/Ce9ehC85u1cXwxIVvuIJlea71/nvFZyHs0BU7P5b15wFXMLlzpf12av/R1A5dY3rnSiZ3rvRjuJQsdJDpnSuJO1eaXFY2gM4piuIvAVNYlmeqn5bk/yuATmqX5v/D0jyXMbkz1T9cWhY67cfBxWEz+A1xZ6qiFHfotMb5MFxO3JmqcCIddFsRHwVcQtyZqonYCQB6R9wBIBlxZ6p2Wd5ZuAA9JO5M1S7LjwPoriZeBlxC3JnqvULcocsGdZwEXELcmWpwHk8C6Kxzq2tMIe5MNbnyVVEIPHTU+HRYmdy5lLhzpaYpngbQOU00fw2YQty50q067gfQOU1d2jaZSty50mRpvp0QHgXQHUXx8MWwGgdMIe5cq50QqvCed+iM+jyOA64g7sF1JhNCUxd2JtAFdXNsauc67ufOzPZeHX0bjVtMwsY0xdPT3eog4Bomd2Z267y41z546w1sxrhu4jBgBuLOzCYn19V18WkIPKzbuN327liOZ1bizlwmO5db7U7GGfSwJu1S/A918WdhZx6OubOwvVF1GGVz1D7dDWCpJndlbKf14++HlfezMzdx50Zuj6rdoqyrIoq7AdzYJOpNXXzzQ8T9cXsoLGAB4s5STCLfHuM5KAZxt2magwDm0y6/l4Pi2//3r+aRqHNT4s7S7Y6qnX+L2C/jfDfKwW4Al6vPx3UMxv+IOBF0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJhPEbBku6Nq53/Gvw4G7/3uo/Om3m1/yHYC+JUm4qxoir839b9Omnjv5MWwGgcsibizFJOgv/9e/VnUxeHkwwDmddIU8aQ5L74Rem5K3LmR26Nqtxw0R+0YchjAchTxsD4vjkWeRYk7C/v49fFnZV1XjWV3WI2yqU7/8NVxwJzEnblNluB/P2i+bZo4CGDVTuq6+NQUzzzEnblcLMOXzeNwXB3WadwG/o7AMytxZ2bCDhsl8MysDJjRYNA8CGGHTZn84frbgBmIOzPZe3185Bg7bNz+H18dfR1wDcvyXOun5fhRAN1QF38+HVYnAVOY3LnWxfvYgc4oBo3pnSuZ3LmSqR06yvTOFUzuXKks4/MAuqesPwmYQty5RvOXADqo+CxgCnFnqsmSfPuwH0AX7dz+vxfbKPyGuDPV7wbCDl1W/tPbU7mcuDPVeSPu0GVNU9tGuZS4cxV3e4MOK4ry3wMuIe5M5VauAP0k7gCQjLgzVRFxFgD0jrgzVbssPw6gu5p4GXAJcWeqpg6XtoQOG9hGmULcmerfwo4DuuyftlGmEHemOhlWZ0URTwLonqZ5+mJYjQMuIe5cqW6KvwbQOcV7gwcBU4g7V/ofdTwMZ81D14zP/9k8DZhC3LnSZGm+nRG+CaA76uaRJXmuIu5c61Yd98Pb4qArxnWUDwOuIO5cazK913VxL4CNKwZlZWrnOuLOTNqdyZOoi+MANqdujp9/cPQo4BpFwBz2XlbtEn3zWQBr1bTH2b8ffnUYMAOTO3M5/aj63AQP69WG/RthZx4mdxby8aj6vCibrwNYqaYuvvh+OFkxg9mJOwu7Pap2y7L5tn26H8ByNcXTaOLz02HlErPMTdy5sb1RdVgM4m7TNAcB3Ewb9bqJ6uIkVliQuLM0byb5OCyK+IvQw2zanfBZ0xT/p53Sn9QRT0SdZRB3Vqad6PfbndVOANOMvWcdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABZTBCzR7qjaeT/OP2kG5Z/aH67daGI/gMucFUWc1REnZVmenP+zefpiWI0DlkDcWYq9UXVYDJq7TRMHASykjf2TKMuHzz84ehRwA+LOjUyiHmVzFJMpHViWcTEoK5FnUeLOQm6Pqt3BoHlgUofVmUzy5+fFPcv1zEvcmVs7re+30/q3YVqHdRhHXXx6OqxOAmYk7sxlEvaibB43ETsBrMtZ3Qa+neCfBMxA3JnZxVJ82TwTdtiIs3aCv2OCZxZlwAwmYS9N7LBJO5PDYZNtMeAa4s5MyoEz4qEDLk5kDbiGZXmu1U4KB5OpPYBOaI+/33H8nauY3LnW4M3UDnSEbZLriDtXmkzt3ssO3TLZJifbZsAU4s6V2mPtdwPonHIQtk2mEneuZmqHbmqaTwKmEHemurgSnTPkoat2LM0zjbgz1WAg7NBlRemWylxO3Jnq3L3YoePq3YBLiDtTNZbkodOKovz3gEuIOwAkI+4AkIy4M1UxuY800FlNU/894BLiznS1uEO3leOAS4g7V3HfaOiwpraNcjl3heNKey+P/ivcwx066fSjY/twLmVy50pNFH8NoHNsm1xF3LlSu+z3MIDOKQfFtwFTWNLhWu3S/LP2wdXqoDvG7ZL8MGAKkzvXquviiwA6oxiUVcAVTO7M5I+vjh43bv8KXWBq51omd2Zyfl7cax/OAtiYdho7a1fS7gRcQ9yZyYthNW53Kp8GsDHtNnhvsi0GXEPcmVm7U3ky2bkEsHZNXXzx/bD6LmAG4s5c2sA/bN5M8JboYQ1+Woq/14b9fsCMnFDHQm6Pqt2ybB6He77DKo2j/cP06bBymVnmIu7cyN6oqqJs7obIw9JMpvV2heybHyLuj4eVVTLmJu7c2GSKb3+QPinK5rMQeViYqLMs4s5StaE/KMs4KIr4S1PHf0TR/CmAyzXNyyjLZ01Tv2zq8rvJSasBS/D/AZhznmxGEXvlAAAAAElFTkSuQmCC"
            alt="logo"
            width={"50px"}
          ></img>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" onClick={() => setActiveTab("dashboard")}>
            <Link
              to={"/"}
              className={`nav-link text-white ${
                activeTab == "dashboard" ? "active" : ""
              } d-flex align-items-center gap-2`}
              aria-current="page"
            >
              <AiOutlineDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          <li onClick={() => setActiveTab("interests")}>
            <Link
              to={"/interests"}
              className={`nav-link text-white ${
                activeTab == "interests" ? "active" : ""
              } d-flex align-items-center gap-2`}
            >
              <MdOutlineDashboardCustomize />
              <span>Interests</span>
            </Link>
          </li>
          <li onClick={() => setActiveTab("users")}>
            <Link
              to="/users/1/10"
              className={`nav-link text-white ${
                activeTab == "users" ? "active" : ""
              } d-flex align-items-center gap-2`}
            >
              <LuUserRound />
              <span>Users</span>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
