function updateSyntaxHighlighting() {
    const keywords = ['self', 'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'];
    const functions = ['assert', 'collectgarbage', 'error', 'getmetatable', 'ipairs', 'next', 'pairs', 'pcall', 'print', 'rawequal', 'rawget', 'rawlen', 'rawset', 'require', 'select', 'setmetatable', 'tonumber', 'tostring', 'type', 'xpcall', 'utf8', 'coroutine', 'package', 'string', 'table', 'math', 'debug', 'os', 'warn', 'wait', 'delay', 'spawn', 'tick', 'time', 'elapsedTime', 'print', 'warn', 'typeof', 'type', 'Version', 'Instance', 'Vector3', 'CFrame', 'UDim2', 'Color3', 'Enum', 'workspace', 'game', 'script', 'players'];

    function syntaxHighlight(code) {
        const commentRegex = /--.*$/gm;
        const comments = [];
        let highlightedCode = code.replace(commentRegex, (match) => {
            comments.push(match);
            return `__COMMENT_${comments.length - 1}__`;
        });

        highlightedCode = highlightedCode
            .replace(/"[^"]*"/g, '<span class="_string">$&</span>')
            .replace(/(?<!["'])\b(\d+)\b(?!["'])/g, '<span class="_number">$1</span>')
            .replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), '<span class="_keyword">$1</span>')
            .replace(/(\w+):(\w+)\s*(\()/g, '$1:<span class="_localmethod">$2</span>$3') // Move this line up
            .replace(new RegExp(`\\b(${functions.join('|')})\\b`, 'g'), '<span class="_builtinfunction">$1</span>') // Move this line down
            .replace(/(\w+)\.(\w+)\s*(\()/g, '$1.<span class="_localmethod">$2</span>$3')
            .replace(/\.(\w+)\.(\w+)/g, '.<span class="_localproperty">$1</span>.<span class="_localproperty">$2</span>')
            .replace(/\]\.(\w+)/g, '].<span class="_localproperty">$1</span>')
            .replace(/\)\.(\w+)/g, ').<span class="_localproperty">$1</span>')
            .replace(/(\w+)\.(\w+)/g, '$1.<span class="_localproperty">$2</span>');

        comments.forEach((comment, index) => {
            highlightedCode = highlightedCode.replace(`__COMMENT_${index}__`, `<span class="_comment">${comment}</span>`);
        });

        return highlightedCode;
    }

    document.querySelectorAll('pre code').forEach((block) => {
        block.innerHTML = syntaxHighlight(block.innerText);
    });
}

function documentationDescription(description) {
    const codeBlockRegex = /```lua([\s\S]*?)```/g;
    return description
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="documentationBoxReference" href="$2">$1</a>')
        .replace(codeBlockRegex, function (match, codeContent) {
            return `<pre><code>${codeContent.trim()}</code></pre>`;
        });
}

function typeProperty(propertyType, propertyClass, objectClass) {
    let typeHTMLArray = []

    if (typeof(propertyType[1]) == "string") {
        typeHTMLArray.push(`<a href="${propertyType[1]}" class="${propertyClass}">${propertyType[0]}</a>`)
    } else if (typeof(propertyType[1]) == "object") {
        const objectTypes = []
        for (let objectName in propertyType[1]) {
            if (objectName == "_this") continue;
            const objectValue = propertyType[1][objectName]
            objectTypes.push(`<a href="${objectValue}" class="${propertyClass}">${objectName}</a>`)
        }

        typeHTMLArray.push(`<a href="${propertyType[1]._this}" class="${objectClass || propertyClass}">${propertyType[0]}</a><${objectTypes.join(", ")}>`)
    }

    var typeHTML = typeHTMLArray.join(", ")
    if (typeHTMLArray.length > 1) { typeHTML = `(${typeHTML})` }
    return typeHTML
}

function typeParameters(parameters, propertyClass) {
    let typeHTMLArray = []
    for (let parameterName in parameters) {
        const parameter = parameters[parameterName]
        typeHTMLArray.push(`${parameterName} : <a href="${parameter[1]}" class="${propertyClass}">${parameter[0]}</a>`)
    }

    var typeHTML = typeHTMLArray.join(", ")
    return typeHTML
}

function tableTypeAppending(tableTypes, section) {
    const container = document.createElement("div");
    container.classList.add("tableTypeContainer");
    section.appendChild(container)

    const keys = Object.keys(tableTypes);
    const lastParameter = keys[keys.length - 1];

    for (let parameterName in tableTypes) {
        const parameter = tableTypes[parameterName]

        const parameterParagraph = document.createElement("p")
        parameterParagraph.classList.add("methodParameters")
        parameterParagraph.innerHTML = `${parameterName} : <a class="methodType documentationReference" href="${parameter[1]}">${parameter[0]}</a>`
        container.appendChild(parameterParagraph)

        if (lastParameter != parameterName) container.appendChild(document.createElement("hr"))
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });

    const paths = window.location.pathname.split("/")
    const lastPathName = paths[paths.length]

    const response = await fetch(`https://docs.wyverion.com/reference/force/documentation/${lastPathName}.json5`)
    const constructor = JSON5.parse(await response.text())

    { // Header
        const header = document.createElement("header");
        header.innerHTML = `<h1>${constructor.header}</h1>`
        document.body.appendChild(header)
    }

    const main = document.createElement("main");
    document.body.appendChild(main)

    { // Documentation Heading
        const documentationSection = document.createElement("section");
        const heading = document.createElement("h1");

        documentationSection.id = "Heading"

        const documentationConstructor = constructor.documentation_section
        heading.innerHTML = `<span class="classTitle"><code>${documentationConstructor.type}</code></span> ${documentationConstructor.name}`

        documentationSection.appendChild(heading)

        const paragraph = document.createElement("p");
        paragraph.innerHTML = documentationDescription(documentationConstructor.description)

        documentationSection.appendChild(paragraph)

        main.appendChild(documentationSection)
    }

    const summarySection = document.createElement("section");
    summarySection.innerHTML = `<h1>Summary<h1>`
    summarySection.id = "Summary"
    main.appendChild(summarySection)
    summarySection.appendChild(document.createElement("hr"))

    const summaryPropertiesSpan = document.createElement("span");
    summaryPropertiesSpan.id = "summary-properties"
    summarySection.appendChild(summaryPropertiesSpan)

    {
        const seperator = document.createElement("hr")
        seperator.classList.add("hrseparator")
        summarySection.appendChild(seperator)
    }

    const summaryMethodsSpan = document.createElement("span");
    summaryMethodsSpan.id = "summary-methods"
    summarySection.appendChild(summaryMethodsSpan)

    const propertiesSection = document.createElement("section");
    propertiesSection.innerHTML = `<h1>Properties<h1>`
    propertiesSection.id = "Properties"
    propertiesSection.classList.add("explanation")
    main.appendChild(propertiesSection)

    const methodsSection = document.createElement("section");
    methodsSection.innerHTML = `<h1>Methods<h1>`
    methodsSection.id = "Methods"
    methodsSection.classList.add("explanation")
    main.appendChild(methodsSection)

    const signalsSection = document.createElement("section");
    signalsSection.innerHTML = `<h1>Signals<h1>`
    signalsSection.id = "Signals"
    signalsSection.classList.add("explanation")
    main.appendChild(signalsSection)

    {
        propertiesSection.appendChild(document.createElement("hr"))
        methodsSection.appendChild(document.createElement("hr"))

        const summaryProperties = document.createElement("h2");
        summaryProperties.textContent = "Properties"
        summaryPropertiesSpan.appendChild(summaryProperties)

        const summaryMethods = document.createElement("h2");
        summaryMethods.textContent = "Methods"
        summaryMethodsSpan.appendChild(summaryMethods)
    }

    {

        const properties = constructor.properties
        for (let propertyName in properties) {
            const property = properties[propertyName]

            { // Summary
                const heading = document.createElement("h4");
                heading.classList.add(`property_${propertyName}`)

                const typeHTML = typeProperty(property.type, "externalDocumentationReference", "externalObjectDocumentationReference")

                heading.innerHTML = `<a href="#${propertyName}" class="documentationReference">${propertyName}</a> : ${typeHTML}`

                summaryPropertiesSpan.appendChild(heading)

                const paragraph = document.createElement("p");
                paragraph.innerHTML = documentationDescription(property.summary)
                summaryPropertiesSpan.appendChild(paragraph)
                summaryPropertiesSpan.appendChild(document.createElement("hr"))
            } { // Properties
                const heading = document.createElement("h2");
                const typeHTML = typeProperty(property.type, "propertyType documentationReference")
                heading.innerHTML = `${propertyName} <span class="documentationSpanReference">${typeHTML}</span>`
                propertiesSection.appendChild(heading)

                const paragraph = document.createElement("p");
                paragraph.innerHTML = documentationDescription(property.description)

                propertiesSection.appendChild(paragraph)
                propertiesSection.appendChild(document.createElement("hr"))
            }
        }

        const methods = constructor.methods
        for (let methodName in methods) {
            const method = methods[methodName]

            { // Summary
                const heading = document.createElement("h4");
                heading.classList.add(`method_${methodName}`)

                const typeHTMLParameters = typeParameters(method.parameters, "externalDocumentationReference")

                const returnFormatted = {}
                for (let returnName in method.returns) {
                    const returnData = method.returns[returnName]
                    returnFormatted[returnData[0]] = returnData[1]
                }

                const typeHTMLReturns = typeProperty(returnFormatted, "externalDocumentationReference", "externalObjectDocumentationReference")

                const typeHTML = `(${typeHTMLParameters}) : ${typeHTMLReturns}`

                heading.innerHTML = `<a href="#${methodName}" class="documentationReference">${methodName}</a> <span class="externalObjectDocumentationReference">${typeHTML}</span>`

                summaryMethodsSpan.appendChild(heading)

                const paragraph = document.createElement("p");
                paragraph.innerHTML = documentationDescription(method.summary)
                summaryMethodsSpan.appendChild(paragraph)
                summaryMethodsSpan.appendChild(document.createElement("hr"))
            }

            { // Methods
                const heading = document.createElement("h2");
                heading.innerHTML = methodName
                methodsSection.appendChild(heading)

                const paragraph = document.createElement("p");
                paragraph.innerHTML = documentationDescription(method.description)
                methodsSection.appendChild(paragraph)

                const parametersHeading = document.createElement("h2");
                parametersHeading.innerHTML = "Parameters"
                methodsSection.appendChild(parametersHeading)

                tableTypeAppending(method.parameters, methodsSection)

                const returnsHeading = document.createElement("h2");
                returnsHeading.innerHTML = "Returns"
                methodsSection.appendChild(returnsHeading)

                tableTypeAppending(method.returns, methodsSection)

                methodsSection.appendChild(document.createElement("hr"))
            }
        }

        updateSyntaxHighlighting()
    }

    if (sessionStorage.getItem('scrollPosition')) {
        window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
    }
});