import requests
from bs4 import BeautifulSoup
from fastapi import HTTPException
from app.repositories import config_repo
import unicodedata
from urllib.parse import unquote

def remove_accents(text):
    return ''.join(
        char for char in unicodedata.normalize('NFD', text)
        if unicodedata.category(char) != 'Mn'
    )

def crawl_resources_abc(request):

    try:
        url = request.url
        # Remover el tipo list
        search_param = "".join(request.search_param)
        university_name = request.university_name
        # search_param = remove_accents(search_param)
        
        # decodificar
        print(search_param)
        decoded_param = unquote(search_param)
        print("Decodificado", decoded_param)
        #remover acentos
        search_param = remove_accents(decoded_param)
        print("Sin acentos",search_param)
        request_body = config_repo.get_request_body(university_name)
        selectors = config_repo.get_selectors(university_name)
        print(selectors)
        # print("Crawler para catalogo de: ", university_name)
        # print("request Body: ", request_body)
        # Construcción de la carga útil (payload)
        payload = {
            "IsisScript": "iah.xis",
            "environment": request_body.get("enviroment"),
            # "avaibleFormats": "^nDEFAULT^fdetailed.pft",
            # "apperance": "^eaosorio@funlam.edu.co^rON^mON^aes",
            # "helpInfo": "^nHELP FORM^vhelp_form_lilacs.htm",
            # "gizmoDecod": "",
            # "avaibleForms": "F,A",
            # "logoImage": "pixbanner.jpg",
            # "logoURL": "^2/htdocs/site/php/index.php",
            # "headerImage": "online.gif",
            # "headerURL": "^2/htdocs/iah/es/index.htm",
            # "form": "F",
            # "pathImages": "/iah/es/image/",
            # "navBar": "ON",
            # "hits": 20,
            # "format": "detailed.pft",
            "lang": "es",
            "user": "GUEST",
            # "baseFeatures": "^eOFF^fXML",
            "related": "",
            "nextAction": "search",
            "base": "MARC",
            "exprSearch": search_param,
            "conectSearch": "and"
        }

        response = requests.post(url, data=payload)
        if response.status_code != 200:
            print("Error realizando la petición")
            raise HTTPException(status_code=response.status_code,
                                detail=f"Request failed with status {response.status_code}")

        soup = BeautifulSoup(response.text, 'html.parser')
        containers = soup.select('div div.resultCol')
        # print(containers[0])
        found_resources = []
        num_results_element = soup.select_one("div:nth-of-type(4) .columnB b")

        # Verificar si el elemento existe antes de llamar a get_text()
        if num_results_element:
            num_results = num_results_element.get_text(strip=True)
        else:
            # Valor predeterminado si no se encuentra el elemento
            num_results = "No results found"

        for container in containers:
            title_label = container.find(
                lambda tag: tag.name == "font" and "Título:" in tag.text)
            if title_label:
                title_element = title_label.find_next("font")
                title_text = title_element.get_text(
                    strip=True) if title_element else "No Title"
            else:
                title_text = "No Title"

           # Definir los selectores para 'author' o usar el selector por defecto
            author = container.find(
                lambda tag: tag.name == "font" and "Autor:" in tag.text)

            # Verifica si se encontró el autor, si es así, navega al siguiente font
            if author:
                author_element = author.find_next("font")
                author_text = author_element.get_text(
                    strip=True) if author_element else "No Author"
            else:
                author_text = "No Author"

            Descriptores = container.find(
                lambda tag: tag.name == "font" and "Descriptores:" in tag.text)

            # Verifica si se encontró el campo Descriptores, si es así, navega al siguiente font
            if Descriptores:
                Descriptores_element = Descriptores.find_next("font")
                Descriptores_text = Descriptores_element.get_text(
                    strip=True) if Descriptores_element else "No Descriptor"
            else:
                Descriptores_text = "No Descriptor"

            signatura = container.find(
                lambda tag: tag.name == "b" and "Signatura:" in tag.text)
            signatura_text = signatura.find_next("font").get_text(
                strip=True) if signatura else None

            ubicacion = container.find(
                lambda tag: tag.name == "b" and "Total disponibilidad" in tag.text)
            ubicacion_text = ubicacion.find_next("td").get_text(
                strip=True) if ubicacion else None

            publicDatos = container.find(
                lambda tag: tag.name == "font" and "Datos de Publicación" in tag.text)
            publicDatos_text = publicDatos.find_next("td").get_text(
                strip=True) if publicDatos else None

            found_resources.append({
                "Titulo": title_text,
                "Autor": author_text,
                "Descriptores": Descriptores_text,
                "Signatura": signatura_text,
                "Ubicacion": ubicacion_text,
                "Datos de publicación": publicDatos_text
            })

        return {
            "foundResources": found_resources,
            "URL": url,
            "totalCount": num_results,
            "universityName": university_name
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
