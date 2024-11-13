import requests
from fastapi import HTTPException
import traceback
import httpx
import os
from dotenv import load_dotenv

load_dotenv()


def crawl_resources_primo(request):
    try:
        university_name = request.university_name
        search_param= request.search_param
        try:
            response = requests.get(request.url, timeout=30)
            response.raise_for_status()  # Verifica si hay algún error HTTP
        except requests.Timeout:
            raise HTTPException(
                status_code=504, detail="Request timed out. The server took too long to respond.")
        except requests.RequestException as e:
            print("Error al realizar la petición:", str(e))
            print(traceback.format_exc())
            raise HTTPException(
                status_code=500, detail=f"Error al realizar la petición: {str(e)}")
        except Exception as e:
            print("Error inesperado:", str(e))
            print(traceback.format_exc())
            raise HTTPException(
                status_code=500, detail=f"Error inesperado: {str(e)}")

        found_resources = []
        json_data = response.json()
        info = json_data.get("info", {})
        num_results = info.get("total", 0)
        docs = json_data.get("docs", [])
        if docs:
            for doc in docs:
                resource = {}
                pnx = doc.get("pnx", {})
                display = pnx.get("display", {})

                titles = display.get("title", [])
                sources = display.get("source", [])
                subjects = display.get("subject", [])
                types = display.get("type", [])

                concatenated_titles = "".join(titles)
                concatenated_sources = "".join(sources)
                concatenated_subjects = "".join(subjects)
                concatenated_types = "".join(types)

                # print(concatenated_titles)
                # print(concatenated_sources)
                # print(concatenated_subjects)
                # print(concatenated_types)

                sort = pnx.get("sort", {})
                authors = sort.get("author", [])
                creationdates = sort.get("creationdate", [])

                concatenated_authors = "".join(authors)
                concatenated_creationdates = "".join(creationdates)
                # print(concatenated_authors)
                # print(concatenated_creationdates)

                resource["Titulo"] = concatenated_titles
                resource["Autor"] = concatenated_authors
                resource["Source"] = concatenated_sources
                resource["Subject"] = concatenated_subjects
                resource["Type"] = concatenated_types
                resource["Fecha de creación"] = concatenated_creationdates
                
                control = pnx.get("control", {})
                recordIds = control.get("recordid", ["null"])
                print(recordIds[0])
                if recordIds and recordIds[0] is not None: 
                    with httpx.Client(timeout=httpx.Timeout(60, connect=60)) as client:
                        try:
                            response = client.post(
                                f'{os.getenv("CATALOGS_SERVICE")}/create-url/primo',
                                json={
                                    "university_name": university_name,
                                    "search_param": " ".join(search_param),
                                    "recordid": recordIds[0]
                                }
                            )
                            response.raise_for_status()  # Lanza un error si la respuesta no es 2xx
                            try:
                                search_url = response.json() 
                                resource["Link"] = search_url 
                            except ValueError:
                                return {"university": university_name, "error": "Invalid JSON response"}
                        except httpx.RequestError as e:
                            return {"university": university_name, "error": f"An error occurred: {str(e)}"}
                else:
                    return {"university": university_name, "error": "No valid record ID provided"}
                found_resources.append(resource)
        else:
            print("No se encontraron documentos.")
        
        return {
            "foundResources": found_resources,
            "URL": request.url,
            "totalCount": num_results,
            "universityName": university_name
        }

    except requests.Timeout:
        raise HTTPException(
            status_code=504, detail="Request timed out. The server took too long to respond.")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
