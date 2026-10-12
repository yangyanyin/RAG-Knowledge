// Markdown 文档切割：以 ## 二级标题为界切段，## 到下一个 ## 之间的所有内容
// （包括里面的 ### 等更深层子标题、代码块）都算作同一段，不管内容多长/多短，
// 一个 ## 标题对应一个 chunk，不做字符数上的二次切分或合并。

export interface DocChunk {
  id: string;
  text: string;
  heading: string;
  chunkIndex: number;
}

interface Section {
  heading: string; // 该段所属的 ## 标题文本（文档最开头、第一个 ## 之前的内容为空字符串）
  content: string; // 该标题下的正文（含代码块和更深层子标题），不含 ## 标题本身
}

// 按 Markdown 的 ## 二级标题把全文切成若干 section，
// # 一级标题、### 及更深层标题都不切分，原样留在所属 section 的正文里；
// 代码块内部的 # 不会被误当成标题（比如 shell 注释、示例代码里的 #）
function splitByH2Headings(markdown: string): Section[] {
  const lines = markdown.split('\n');
  const sections: Section[] = [];
  let currentHeading = '';
  let currentContent: string[] = [];
  let inCodeBlock = false;

  function flush() {
    const content = currentContent.join('\n').trim();
    if (content) {
      sections.push({ heading: currentHeading, content });
    }
    currentContent = [];
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      currentContent.push(line);
      continue;
    }

    const h2Match = !inCodeBlock && line.match(/^##\s+(.*)$/);
    if (h2Match) {
      flush();
      currentHeading = h2Match[1].trim();
      continue;
    }

    currentContent.push(line);
  }
  flush();

  return sections;
}

// 对外入口：传入 markdown 原文和来源标识（一般用文件名），返回切好的 chunk 列表
export function chunkMarkdown(markdown: string, source: string): DocChunk[] {
  const sections = splitByH2Headings(markdown);

  return sections.map((section, index) => ({
    id: `${source}#${index}`,
    text: section.heading ? `${section.heading}\n${section.content}` : section.content,
    heading: section.heading,
    chunkIndex: index,
  }));
}
