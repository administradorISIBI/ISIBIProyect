db = db.getSiblingDB("SistemaCatalogos");

//crea un usuario para acceso especial a SistemaCatalogos
db.createUser({
  user: "UniversityUser",
  pwd: "asDLNNIYY$12342()=$",
  roles: [{ role: "readWrite", db: "SistemaCatalogos" }],
});

db.Favorites.insertMany([
  {
    email: "diego_agudelo82191@elpoli.edu.co",
    resource: {
      Titulo: "Informatica (Ljubljana, Slovenia)",
      Autor: "Slovensko društvo Informatika, issuing body.",
      Source: "Alma",
      Subject:
        "Computers$$QComputers -- PeriodicalsComputer programming$$QComputer programming -- PeriodicalsOrdinateurs$$QOrdinateurs -- PériodiquesProgrammation (Informatique)$$QProgrammation (Informatique) -- PériodiquesComputer programmingComputersZeitschriftInformatik",
      Type: "journal",
      "Fecha de creación": "1977",
      Link: "https://polijic.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma99562171108196&context=L&vid=57PJIC_INST:PJIC&lang=es&search_scope=MyInst_and_CI&adaptor=Local%20Search%20Engine&tab=ALL&query=any,contains,Informatica&mode=simple",
    },
    imagen:
      "http://www.mbies.info/wp-content/uploads/2013/10/JaimeIsazaCadavid.png",
    nombre: "POLIJIC",
    large_name: "Politécnico Colombiano Jaime Isaza Cadavid",
    dateCreated: {
      $date: "2024-11-02T19:52:21.768Z",
    },
    status: false,
  },
]);

//insercion a Searchs
db.Searchs.insertMany([
  {
    email: "diego_agudelo82191@elpoli.edu.co",
    catalogs: [
      {
        large_name: "Politécnico Colombiano Jaime Isaza Cadavid",
        url: "https://polijic.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?",
        nombre: "POLIJIC",
      },
    ],
    params: {
      searchParam: ["ingenieria", "AND", "informática", "OR", "sistemas"],
      sortOrder: "popularity_asc",
      format: "articulo",
      language: "ingles",
      dateRange: {
        start: "",
        end: "-2024",
      },
    },
    advanced: true,
  },
]);

//Insercion a catalogos
db.Catalogs.insertMany([
  {
    status: true,
    nombre: "koha",
    advqueryparamstemplate: "/cgi-bin/koha/opac-search.pl?advsearch=1",
    advqueryparams: {
      year_range: "limit-yr={LIMIT_YR}",
      idx: "idx=kw",
      query: "q={QUERY_PARAM}",
      relevance: "order_by={ORDER_BY}",
      logicOperator: "op={LOGICOPERATOR}",
    },
    basicSearchTemplate:
      "/cgi-bin/koha/opac-search.pl?idx=&q={QUERY_PARAMS}&limit=&weight_search=1",
    searchtemplate: "/cgi-bin/koha/opac-search.pl?{QUERY_PARAMS}",
    requestType: "URLParams",
    extractType: "Sraping",
    method: "get",
    filters: {
      sort_by: {
        relevancia: "relevance",
        popularidada_z: "popularity_asc",
        popularidadz_a: "popularity_dsc",
        autora_z: "author_az",
        autorz_a: "author_za",
        titulo_az: "title_az",
        titulo_za: "title_za",
      },
      idiom: {
        english: "limit=ln%2Crtrn%3Aeng",
        spanish: "limit=ln%2Crtrn%3Aspa",
      },
    },
  },
  {
    nombre: "PRIMO",
    searchtemplateV2:
      "/discovery/search?query=any,contains,{QUERY_PARAMS}&tab=Everything&search_scope=MyInst_and_CI&vid=57PJIC_INST:PJIC&lang=es&mode=simple",
    searchtemplate:
      "?offset=10&inst={instCode}&limit=20&vid={vidCode}&scope=MyInst_and_CI&tab=Everything&q=any,contains,{QUERY_PARAMS}&qInclude=&qExclude=&lang=es&otbRanking=false&sort=rank&searchInFulltextUserSelection=false&pcAvailability=false&rtaLinks=true&disableCache=false&getMore=0&skipDelivery=Y&isCDSearch=false&mode=Basic&newspapersActive=false&refEntryActive=false&blendFacetsSeparately=false&citationTrailFilterByAvailability=true&acTriggered=false",
    URLFullDisplayTemplate:
      "docid={recordid}&context=L&vid={vidCode}&lang=es&search_scope=MyInst_and_CI&adaptor=Local%20Search%20Engine&tab=ALL&query=any,contains,{QUERY_PARAMS}&mode=simple",
    requestType: "URLParams",
    extractType: "Parsing",
    method: "get",
    status: true,
  },
  {
    nombre: "ABCD",
    requestType: "BodyParams",
    extractType: "Scraping",
    method: "Post",
    status: true,
  },
]);
//insercion a catalogos universitarios
db.Universities.insertMany([
  {
    nombre: "Colegiatura",
    imagen: "http://www.mbies.info/wp-content/uploads/2022/06/logo-01.png",
    large_name: "Colegiatura",
    url: "https://colegiatura.com.co",
    catalog_system: "koha",
    status: true,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: ".author li:nth-of-type(1) a",
      idiom: "span:nth-of-type(n+2) span.lang_code-spa",
      material_type:
        "div.results_summary:nth-of-type(1) span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h1",
    },
  },
  {
    nombre: "Atec",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2024/02/ATEC-sin-fondo.png",
    large_name: "Corporación Academia Tecnológica de Colombia ATEC",
    url: "https://library.unac.edu.co",
    catalog_system: "koha",
    status: true,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: ".author li:nth-of-type(1) a",
      idiom: "span:nth-of-type(n+2) span.lang_code-spa",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1",
    },
  },
  {
    nombre: "Lasallista",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2022/06/logoUnilasallista.png",
    large_name: "Corporación Universitaria Lasallista",
    url: "https://lasallista.kohahosting.info",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span:nth-of-type(1) .language span:nth-of-type(2)",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h2#numresults",
    },
  },
  {
    nombre: "Remington",
    imagen: "http://www.mbies.info/wp-content/uploads/2013/10/Uniremington.png",
    large_name: "Corporación Universitaria Remington",
    url: "https://kohabiblioteca.uniremington.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span.language:nth-of-type(1) span:nth-of-type(2)",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1",
    },
  },
  {
    nombre: "ESAP",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Escuela_Superior_de_Administraci%C3%B3n_P%C3%BAblica_logo.png",
    large_name: "Escuela Superior de Administración Pública",
    url: "https://biblioteca.esap.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span.código_de_idioma-spa",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h2#numresults",
    },
  },
  {
    nombre: "Area Andina",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2023/09/40-ANOS-VERDE-alta-calidad-2048x518.png",
    large_name: "Fundación Universitaria Área Andina",
    url: "https://biblioteca.areandina.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "ul.author",
      idiom:
        "tr:nth-of-type(n+2) span.language:nth-of-type(1) span:nth-of-type(2)",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "Seminario Bíblico",
    imagen:
      "http://www.mbies.info/wp-content/uploads/2022/06/convenios-interbibliotecarios-20.png",
    large_name: "Fundación Universitaria Seminario Bíblico de Colombia",
    url: "https://bibliotecaunisbc.com",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: ".author li:nth-of-type(1) a",
      idiom: "span:nth-of-type(n+2) span.lang_code-spa",
      material_type:
        "div.results_summary:nth-of-type(1) span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "Americana",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2022/06/Logo-desktop-800x195-Corporacion-uameri.png",
    large_name: "Institución Universitaria Americana",
    url: "https://coruniamericana.metacatalogo.org",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "ul.author",
      idiom: "span:nth-of-type(2) span.lang_code-spa",
      material_type: "span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "CEIPA",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2023/03/MicrosoftTeams-image-72-1-450x192.png",
    large_name: "Institución Universitaria CEIPA",
    url: "https://ceipa.metacatalogo.org",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "ul.author",
      idiom: "span.lang_code-ESPAÑOL",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "Poligran",
    imagen: "http://www.mbies.info/wp-content/uploads/2022/06/Logo-Poli.png",
    large_name: "Institución Universitaria Politécnico Grancolombiano",
    url: "https://catalogo.poligran.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span.lang_code-spa",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "UdeA",
    imagen: "http://www.mbies.info/wp-content/uploads/2013/10/logo-udea.png",
    large_name: "Universidad de Antioquia",
    url: "https://catalejo.udea.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span.lang_code-spa",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    nombre: "ECCI",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2024/02/UnivercidadECCI-sin-fondo.png",
    large_name: "Universidad ECCI",
    url: "https://biblioteca.ecci.edu.co",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span.lang_code-spa",
      material_type: "span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h1#numresults",
    },
  },
  {
    imagen:
      "https://www.funlam.edu.co/themes/uluisamigo/img/Logo-UcatolicaLuisAmigo.png",
    nombre: "LuisAmigo",
    large_name: "Universidad Católica Luis Amigó",
    url: "http://179.50.60.29/cgi-bin/wxis.exe/iah/scripts/?IsisScript=iah.xis&lang=es&base=MARC",
    catalog_system: "ABC",
    status: true,
    selectors: {
      title: "div tr:contains('Título:') td:nth-of-type(2) b",
      author: "div tr:contains('Autor:') td:nth-of-type(2) font",
    },
    request_body: {
      environment:
        "^d/iah/^c/var/www/iah/scripts/^b/var/www/bases/^p/var/www/bases/par/^siah.xis^v3.1.1",
    },
  },
  {
    imagen: "https://www.iush.edu.co/assets/svg/Logo-IUSH.svg",
    nombre: "IUSH",
    large_name: "Institución Universitaria Salazar y Herrera",
    url: "https://biblioush.isisabcd.info/cgi-bin/wxis.exe/iah/scripts/?IsisScript=iah.xis&lang=es&base=MARC",
    catalog_system: "ABC",
    status: true,
    request_body: {
      environment:
        "^d/iah/^c/home/isisabcd/public_html/biblioush/iah/scripts/^b/home/isisabcd/public_html/biblioush/bases/^p/home/isisabcd/public_html/biblioush/bases/par/^siah.xis^v3.1.1",
    },
    selectors: {
      title: "div tr:contains('Título:') td:nth-of-type(2) b",
      author: "div tr:contains('Autor:') td:nth-of-type(2) font",
    },
  },
  {
    imagen:
      "https://www.mbies.info/wp-content/uploads/2023/09/Pascual-Bravo.png",
    nombre: "pascualBravo",
    large_name: "Institución Universitaria Pascual Bravo",
    url: "https://pascualbravo.isisabcd.info/cgi-bin/wxis.exe/iah/scripts/?IsisScript=iah.xis&lang=es&base=MARC",
    catalog_system: "ABC",
    status: true,
    request_body: {
      environment:
        "^d/iah/^c/home/isisabcd/public_html/pascualbravo/iah/scripts/^b/home/isisabcd/public_html/pascualbravo/bases/^p/home/isisabcd/public_html/pascualbravo/bases/par/^siah.xis^v3.1.1",
    },
    selectors: {
      title: "tr:has(td:contains('Título:')) td:nth-of-type(2)",
      author: "div tr:contains('Autor:') td:nth-of-type(2) font",
    },
  },
  {
    nombre: "sanmartin",
    imagen: "http://www.mbies.info/wp-content/uploads/2022/06/l.png",
    large_name: "Fundación Universitaria San Martín",
    url: "https://biblioteca.sanmartin.edu.co/",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span:nth-of-type(n+3) .language span:nth-of-type(2)",
      material_type: " span.results_material_type",
      format_element: "span.results_format",
      num_results_element: "h2#numresults",
    },
  },
  {
    nombre: "iuenvigado",
    imagen: "https://www.mbies.info/wp-content/uploads/2022/09/Logo-IUE-01.png",
    large_name: "Institución Universitaria de Envigado",
    url: "https://bibliotecakoha.iue.edu.co/",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "a.author",
      idiom: "span:nth-of-type(n+2) span.lang_code-spa",
      material_type:
        "div.results_summary:nth-of-type(1) span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h1",
    },
  },
  {
    nombre: "ces",
    imagen: "http://www.mbies.info/wp-content/uploads/2013/10/logo-ces.png",
    large_name: "Universidad CES",
    url: "https://odin.ces.edu.co/",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: "span.author",
      idiom: "span:nth-of-type(1) .language span.lang_code-spa",
      material_type:
        "div.results_summary:nth-of-type(1) span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h2#numresults",
    },
  },
  {
    nombre: "iudigital",
    imagen:
      "https://www.mbies.info/wp-content/uploads/2023/09/11.-IU-DIGITAL.png",
    large_name: "Institución Universitaria Digital de Antioquia",
    url: "https://www.iudigital.edu.co/index.php/bases-de-datos",
    catalog_system: "koha",
    status: false,
    selectors: {
      title: "a.title",
      title_link: "a.title",
      author: ".author li:nth-of-type(1) a",
      idiom: "span:nth-of-type(n+2) span.lang_code-spa",
      material_type:
        "div.results_summary:nth-of-type(1) span.results_material_type",
      format_element: "div.results_summary:nth-of-type(1) span.results_format",
      num_results_element: "h1",
    },
  },
  {
    nombre: "POLIJIC",
    imagen:
      "http://www.mbies.info/wp-content/uploads/2013/10/JaimeIsazaCadavid.png",
    large_name: "Politécnico Colombiano Jaime Isaza Cadavid",
    url: "https://polijic.primo.exlibrisgroup.com/primaws/rest/pub/pnxs?",
    urlV2: "https://polijic.primo.exlibrisgroup.com",
    URLFullDisplay:
      "https://polijic.primo.exlibrisgroup.com/discovery/fulldisplay?",
    catalog_system: "PRIMO",
    instCode: "57PJIC_INST",
    vidCode: "57PJIC_INST:PJIC",
    status: true,
  },
  {
    nombre: "UnivCC",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/U._Cooperativa_de_Colombia_logo.svg/1200px-U._Cooperativa_de_Colombia_logo.svg.png",
    large_name: "Universidad Cooperativa de Colombia",
    url: "https://bibliotecadigital.ucc.edu.co/primaws/rest/pub/pnxs?",
    catalog_system: "PRIMO",
    URLFullDisplay:
      "https://bibliotecadigital.ucc.edu.co/discovery/fulldisplay?",
    instCode: "57UCC_INST",
    vidCode: "57UCC_INST:57UCC_INST",
    status: true,
  },
]);
