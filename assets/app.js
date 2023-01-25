//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchCountry = async (nameCountry) => {
  let url = `https://restcountries.com/v3.1/name/${nameCountry}`;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: (response) => {
      renderCountry(response[0]);
    },
    // beforeSend: (request) => {
    //   console.log("before ajax send");
    // },
    // complete: () => {
    //   console.log("complete ajax send");
    // },
    error: (XMLHttpRequest) => {
      console.log(XMLHttpRequest);
    },
  });
};
const getAllCountryName = async () => {
  $.ajax({
    type: "GET",
    url: `https://restcountries.com/v3.1/all`,
    dataType: "json",
    success: (response) => {
      const names = response.map((country) => country.name.common);
      //   console.log(names.sort());
      names.sort();
      names.forEach((country) =>
        $("select").append(`
            <option value=${country}>
                ${country}
            </option>
        `)
      );
    },
    error: (XMLHttpRequest) => {
      console.log(XMLHttpRequest.responseJSON.message);
    },
  });
};

const renderCountry = (data) => {
  const {
    capital,
    name: { common },
    region,
    flags: { svg },
    languages,
    currencies,
  } = data;
  $(".country_cards").empty();
  $(".country_cards").append(
    `
        <div class="section d-flex justify-content-center "> 
            <div class="card shadow-lg my-1" style="width: 18rem;">
                <img src="${svg}" class="card-img-top" alt="...">
                <div class="card-body" title="Country Name">
                <h5 class="card-title"> ${common}</h5>
                </div>
                <ul class="list-group list-group-flush"> 
                    <li class="list-group-item" title="Region">
                        <i class="fa-solid fa-earth-africa"></i> 
                        ${region}
                    </li>
                    
                    <li class="list-group-item" title="Capital City"> 
                        <i class="fas fa-lg fa-landmark"></i> 
                        ${capital}
                    </li>

                    <li class="list-group-item" title="Languages"> 
                    <i class="fas fa-lg fa-comments"></i> 
                        ${Object.values(languages)}
                    </li>

                    <li class="list-group-item" title="Currencies">
                        <i class="fas fa-lg fa-money-bill-wave"></i> 
                        ${Object.values(currencies)[0].symbol} 
                        ${Object.values(currencies)[0].name} 
                    </li>
                </ul>
            </div>
        </div>
    `
  );
};

$("select").change(function () {
  fetchCountry($("select").find(":selected").val());
});
