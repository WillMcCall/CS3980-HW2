async function getPopulationData() {
    try {
        const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
        if (!response.ok) {
            throw new Error(`HTTP Error! Status Code: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error hitting API: ${error}`);
    }
}

async function main() {
    let content = document.getElementById("content");

    let table = document.createElement("table");
    let headerRow1 = document.createElement("tr");
    let headerRow2 = document.createElement("tr");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");

    th1.textContent = "US Population";
    th2.textContent = "Year";
    th3.textContent = "Population";

    headerRow1.appendChild(th1);
    headerRow2.appendChild(th2);
    headerRow2.appendChild(th3);

    table.appendChild(headerRow1);
    table.appendChild(headerRow2);

    let data = await getPopulationData();

    if (data) {
        for (let i = data.length - 1; i >= 0; i--) {
            let row = document.createElement("tr");
            let tdYear = document.createElement("td");
            let tdPopulation = document.createElement("td");

            tdYear.textContent = data[i]["ID Year"];
            tdPopulation.textContent = data[i].Population;

            row.appendChild(tdYear);
            row.appendChild(tdPopulation);
            table.appendChild(row);
        }
    }

    content.appendChild(table);
}
