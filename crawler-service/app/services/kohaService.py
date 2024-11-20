import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin
from fastapi import HTTPException
from app.repositories import config_repo
import traceback

def crawl_resources(request):
    try:
        university_name = request.university_name
        selectors_config = config_repo.get_selectors(university_name)

        selectors_list = selectors_config.get("selectors_data", [])
        selectors = {item['nombre']: item['selector'] for item in selectors_list}
        num_results_selector = selectors_config.get("num_results_element", "h1")

        try:
            response = requests.get(request.url, timeout=30)
            response.raise_for_status()
        except requests.Timeout:
            raise HTTPException(status_code=504, detail="Request timed out.")
        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error en la petición: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

        soup = BeautifulSoup(response.text, 'html.parser')
        containers = soup.select('td.bibliocol')
        found_resources = []

        for idx, container in enumerate(containers, start=1):
            resource = {}

            for key, selector in selectors.items():
                element = container.select_one(selector)

                if element:
                    if key == "title_link":
                        resource["Link"] = urljoin(request.url, element['href']) if 'href' in element.attrs else "No Link"
                    else:
                        resource[key.capitalize()] = element.get_text(strip=True)

            if resource:
                found_resources.append(resource)

        num_results_element = soup.select_one(num_results_selector)
        if num_results_element:
            num_results_text = num_results_element.get_text(strip=True)
            match = re.search(r'\d+', num_results_text)
            num_results = int(match.group()) if match else "No number found"
        else:
            num_results = "No results count found"

        return {
            "foundResources": found_resources,
            "URL": request.url,
            "totalCount": num_results,
            "universityName": university_name
        }

    except requests.Timeout:
        raise HTTPException(status_code=504, detail="Request timed out.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

#con esta función se extraen los ddatos de manera estática
# def crawl_resources(request):
#     try:
#         # Obtener selectores de la universidad
#         university_name = request.university_name
#         selectors = config_repo.get_selectors(university_name)

#         try:
#             # response = requests.get(request.url, timeout=30, verify=False)
#             response = requests.get(request.url, timeout=30)
#             response.raise_for_status()  # Verifica si hay algún error HTTP
#         except requests.Timeout:
#             raise HTTPException(
#                 status_code=504, detail="Request timed out. The server took too long to respond.")
#         except requests.RequestException as e:
#             #print("Error al realizar la petición:", str(e))
#             #print(traceback.format_exc())
#             raise HTTPException(
#                 status_code=500, detail=f"Error al realizar la petición: {str(e)}")
#         except Exception as e:
#             #print("Error inesperado:", str(e))
#             #print(traceback.format_exc())
#             raise HTTPException(
#                 status_code=500, detail=f"Error inesperado: {str(e)}")

#         soup = BeautifulSoup(response.text, 'html.parser')
#         containers = soup.select('td.bibliocol')
#         found_resources = []

#         for container in containers:
#             resource = {}

#             title_element = container.select_one(selectors.get('title', 'a.title'))
#             if title_element:
#                 resource["Titulo"] = title_element.get_text(strip=True)
#                 resource["Link"] = urljoin(request.url, title_element['href']) if 'href' in title_element.attrs else "No Link"

#             author = container.select_one(selectors.get('author', '.author li:nth-of-type(1) a'))
#             if author:
#                 resource["Autor"] = author.get_text(strip=True)

#             idiom = container.select_one(selectors.get('idiom', 'span:nth-of-type(n+2) span.lang_code-spa'))
#             if idiom:
#                 resource["Idioma"] = idiom.get_text(strip=True)

#             material_type = container.select_one(selectors.get('material_type', 'div.results_summary:nth-of-type(1) span.results_material_type'))
#             if material_type:
#                 resource["Tipo de material"] = material_type.get_text(strip=True).split(":", 1)[-1].strip()

#             format_element = container.select_one(selectors.get('format_element', 'div.results_summary:nth-of-type(1) span.results_format'))
#             if format_element:
#                 resource["Formato"] = format_element.get_text(strip=True).split(":", 1)[-1].strip()

#             # Solo agregar el recurso si tiene atributos válidos
#             if resource:
#                 found_resources.append(resource)

#         num_results_element = soup.select_one(selectors.get('num_results_element', 'h2'))
#         if num_results_element:
#             num_results_text = num_results_element.get_text(strip=True)
#             match = re.search(r'\d+', num_results_text)
#             num_results = int(match.group()) if match else "No number found"
#         else:
#             num_results = "No results count found"

#         return {
#             "foundResources": found_resources,
#             "URL": request.url,
#             "totalCount": num_results,
#             "universityName": university_name
#         }

#     except requests.Timeout:
#         raise HTTPException(
#             status_code=504, detail="Request timed out. The server took too long to respond.")
#     except Exception as e:
#         raise HTTPException(
#             status_code=500, detail=f"An unexpected error occurred: {str(e)}")