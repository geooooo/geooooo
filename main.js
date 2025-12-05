// Придерживаться максимально старой редакции EcmaScript

var imgPreviewElement = null;
var shadowElement = null;
var imageBaseUrl = "assets/"
var imagesToPreload = [
    "iam/wrike-items.jpg",
    "iam/meetup.jpg",
    "iam/gdg.jpg",
    "iam/delphi-old-school-kringe.png",
    "certs/olymp0.jpg",
    "certs/olymp1.jpeg",
    "certs/stepik.png",
    "certs/coursera.png",
];

var skills = {
    "Языки": [
        new Skill("C"),
        new Skill("Go"),
        new Skill("Rust"),
        new Skill("Python"),
        new Skill("JS/TS/Node"),
        new Skill("Dart/Flutter"),
        new Skill("SQL"),
        new Skill("Java"),
        new Skill("C++"),
        new Skill("Assembler x86"),
    ],
    // "Фреймворки, библиотеки и т.п.": {
        // "Go": [
        // ],
    // },
    "База разработки": [
        new Skill("Алгоритмы и структуры данных"),
        new Skill("Многопоточность"),
        new Skill("Операционные системы"),
        new Skill("ООП"),
        new Skill("SOLID"),
        new Skill("GRASP"),
        new Skill("Чистая архитектура"),
    ],
    "Инструменты разработки": [
        new Skill("Git"),
        new Skill("Gitlab"),
        new Skill("Github"),
        new Skill("CI/CD"),
        new Skill("Linux"),
        new Skill("Bash"),
        new Skill("Docker"),
        new Skill("REST API"),
        new Skill("GraphQL"),
        new Skill("RPC"),
        new Skill("GRPC"),
        new Skill("SQLite"),
        new Skill("MySQL"),
        new Skill("PostgreSQL"),
        new Skill("MongoDB"),
    ],
    "Soft-скилы": [
        new Skill("English A2"),
        new Skill("Agile"),
        new Skill("Kanban"),
        new Skill("Scrum"),
        new Skill("Управление проектами"),
        new Skill("Teamlead"),
    ],
    "Приложения": [
        new Skill("Postman"),
        new Skill("VSCode"),
        new Skill("AI инструменты для разработки"),
        new Skill("Trello"),
        new Skill("Wrike"),
        new Skill("Asana"),
        new Skill("Jira"),
    ],
};

function Skill(name, level) {
    this.name = name;
    this.level = level || 0;
}

function main() {
    preloadImages();

    window.addEventListener("load", onWindowLoad);
}

function preloadImages() {
    for (var i = 0; i < imagesToPreload.length; i++) {
        src = imageBaseUrl + imagesToPreload[i];

        var img = new Image();
        img.onload = function(e) {
            console.log("Loaded:", e.target.src);
        };
        img.src = src;
    }
}

function onWindowLoad() {
    shadowElement = window.document.querySelector(".shadow");
    var coursesElement = window.document.querySelector(".courses");
    var skillsContentElement = window.document.querySelector(".section-skills .section-content");
    var achievementsLinkElement = window.document.querySelector("#achievementsLink");

    window.addEventListener("beforeprint", onBeforePrint);
    window.document.body.addEventListener("click", onClickOutside);
    coursesElement.addEventListener("click", onCoursesClick);
    achievementsLinkElement.addEventListener("click", onAchievementsLinkClick);

    renderSkills(skillsContentElement);
}

function renderSkills(containerElement) {
    Object.keys(skills).forEach(function(mainCategoryName) {
        var h3Element = window.document.createElement("h3");
        h3Element.className = "skills-type";
        h3Element.textContent = mainCategoryName;
        containerElement.appendChild(h3Element);

        var listElement = window.document.createElement("ul");
        listElement.className = "skills";
        containerElement.appendChild(listElement);
        
        var mainCategorySkills = skills[mainCategoryName];
        Object.keys(mainCategorySkills).forEach(function(subCategoryName, i) {
            var skill = mainCategorySkills[i];
            var listItemElement = window.document.createElement("li");

            if (skill instanceof Skill) {
                listItemElement.className = "skills-item";

                switch (mainCategoryName) {
                    case "Soft-скилы": 
                        listItemElement.className += " skill_soft"; 
                        break;
                    case "Приложения": 
                        listItemElement.className += " skill_apps"; 
                        break;
                    case "База разработки": 
                        listItemElement.className += " skill_tools"; 
                        break;
                     case "Инструменты разработки": 
                        listItemElement.className += " skill_backend"; 
                        break;
                    case "Языки": 
                        listItemElement.className += " skill_lang"; 
                        break;
                }

                var innerHTML = '<div class="skill-name">{0}</div>'.replace("{0}", skill.name);
                if (skill.level != null) {
                    innerHTML += '<div class="skill-level" data-level="{1}"><b></b><b></b><b></b></div>'.replace("{1}", skill.level);
                }
                listItemElement.innerHTML = innerHTML;
                listElement.appendChild(listItemElement);
            } else {
                // listElement.classList.add("skills_col");
                // listItemElement.innerHTML = '<h4 class="skills-type' +
                //     (subCategoryName === "JavaScript/TypeScript/Node" || subCategoryName === "Python" ? " old" : "") +
                //     '">' + 
                //     subCategoryName + '</h4>';
                // listElement.appendChild(listItemElement);
                
                // var subListElement = window.document.createElement("ul");
                // subListElement.className = "subskills";
                // listItemElement.appendChild(subListElement);

                // Object.keys(mainCategorySkills[subCategoryName]).forEach(function(_, i) {
                //     var skill = mainCategorySkills[subCategoryName][i];
                    
                //     var subListItemElement = window.document.createElement("li");
                //     subListItemElement.className = "skills-item";

                //     switch(subCategoryName) {
                //         case "Go": 
                //             subListItemElement.className += " skill_go"; 
                //             break;
                //         case "Dart/Flutter":
                //             subListItemElement.className += " skill_dart"; 
                //             break;
                //         case "Python":
                //         case "JavaScript/TypeScript/Node":
                //             subListItemElement.className += " old"; 
                //             break;
                //     }

                //     subListItemElement.innerHTML = 
                //         '<div class="skill-name">{0}</div>'.replace("{0}", skill.name) + 
                //         '<div class="skill-level" data-level="{1}"><b></b><b></b><b></b></div>'.replace("{1}", skill.level);
                //     subListElement.appendChild(subListItemElement);
                // })
            }
        });
    });
}

function onBeforePrint() {
    hideImgPreview();
}

function onClickOutside() {
    hideImgPreview();
}

function onCoursesClick(event) {
    var target = event.target;

    if (target instanceof HTMLImageElement) {
        event.stopPropagation();

        onImageClickForPreview(target);
    } else {
        var headerElement = target.closest(".courses-header");
        if (headerElement != null) {
            onToggleCoursesList(headerElement);
        }
    }
}

function onAchievementsLinkClick() {
    var coursesHeaderElements = window.document.querySelectorAll(".courses-header");
    coursesHeaderElements.forEach(onToggleCoursesList);
}

function onImageClickForPreview(imgElement) {
    if (imgPreviewElement != null) {
        hideImgPreview();
    } else if (window.innerWidth <= 1024) {
        showImagePreview(imgElement)
    }
}

function hideImgPreview() {
    if (imgPreviewElement == null) {
        return;
    }
    
    imgPreviewElement.classList.toggle("img-preview");
    imgPreviewElement = null;
    toggleShadow();
}

function showImagePreview(imgElement) {
    if (imgPreviewElement != null) {
        return;
    }

    if (imgElement.alt.includes("Stepik") || imgElement.alt.includes("Coursera")) {
        return;
    }

    imgPreviewElement = imgElement;
    imgPreviewElement.classList.toggle("img-preview");
    toggleShadow();
}

function toggleShadow() {
    shadowElement.classList.toggle("shadow_visible");
}

function onToggleCoursesList(headerElement) {
    var iconElement = headerElement.querySelector(".courses-header-icon");
    iconElement.classList.toggle("courses-header-icon_open");

    var listElement = headerElement.nextElementSibling;
    listElement.classList.toggle("courses-list_open");
}

main();