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
        new Skill("JavaScript"),
        new Skill("TypeScript"),
        new Skill("Node.js"),
        new Skill("Dart"),
        new Skill("C++"),
        new Skill("Assembler x86"),
        new Skill("SQL"),
        new Skill("HTML"),
        new Skill("CSS"),
        new Skill("Bash"),
    ],
    "База разработки": [
        new Skill("Алгоритмы и структуры данных"),
        new Skill("Многопоточность"),
        new Skill("Операционные системы"),
        new Skill("Базы данных"),
        new Skill("ООП"),
        new Skill("SOLID"),
        new Skill("DDD"),
        new Skill("Чистая архитектура"),
        new Skill("Функциональное программирование"),
    ],
    "Инструменты разработки": [
        new Skill("Git"),
        new Skill("Gitlab"),
        new Skill("Github"),
        new Skill("CI/CD"),
        new Skill("Linux"),
        new Skill("Docker"),
        new Skill("Docker Compose"),
        new Skill("REST API"),
        new Skill("GraphQL"),
        new Skill("RPC"),
        new Skill("GRPC"),
        new Skill("SQLite"),
        new Skill("MySQL"),
        new Skill("PostgreSQL"),
        new Skill("MongoDB"),
    ],
    "Фреймворки & SDK": [
        new Skill("Angular"),
        new Skill("React"),
        new Skill("Vue"),
        new Skill("Redux"),
        new Skill("Rx"),
        new Skill("SCSS"),
        new Skill("Less"),
        new Skill("Bottle"),
        new Skill("Flask"),
        new Skill("Express.js"),
        new Skill("Flutter"),
        new Skill("Electron.js"),
    ],
    "Soft-скилы": [
        new Skill("English B1"),
        new Skill("Agile"),
        new Skill("Kanban"),
        new Skill("Scrum"),
        new Skill("Управление проектами"),
        new Skill("Teamlead"),
    ],
    "Приложения": [
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
        Object.keys(mainCategorySkills).forEach(function(_, i) {
            var skill = mainCategorySkills[i];

            var listItemElement = window.document.createElement("li");
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
                case "Фреймворки & SDK": 
                    listItemElement.className += " skill_libs"; 
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