document.addEventListener("DOMContentLoaded", function () {
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
});