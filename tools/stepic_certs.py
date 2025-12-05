# Получение инфы из Степика

import requests
import time

def get_all_course_titles(user_id = 19182402, delay=0.1):
    base_url = f"https://stepik.org/api/certificates?user={user_id}"
    course_titles = []
    page = 1
    
    while True:
        try:
            url = f"{base_url}&page={page}"
            print("request to: " + url)
            
            response = requests.get(url)
            response.raise_for_status()
            
            data = response.json()
            certificates = data.get('certificates', [])
            if not certificates:
                break
            
            for cert in certificates:
                course_title = cert.get('course_title')
                if course_title:
                    course_titles.append(course_title)
            
            meta = data.get('meta', {})
            has_next = meta.get('has_next', False)
            
            if not has_next:
                break
                
            page += 1
            
            time.sleep(delay)   
        except Exception:
            break
    
    return course_titles

def main():
    course_titles = get_all_course_titles()
    print(f"Всего найдено {len(course_titles)} курсов:\n")
    for i, title in enumerate(course_titles, 1):
        print(f"{i}. {title}")

if __name__ == "__main__":
    main()