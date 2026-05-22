const API_BASE_URL = "https://YOUR_RENDER_APP_URL";

const scriptInput = document.getElementById("script");
const styleSelect = document.getElementById("style");
const voiceSelect = document.getElementById("voice");
const generateButton = document.getElementById("generateButton");
const statusText = document.getElementById("status");
const downloadArea = document.getElementById("downloadArea");
const downloadLink = document.getElementById("downloadLink");

generateButton.addEventListener("click", async () => {
  const script = scriptInput.value.trim();
  const style = styleSelect.value;
  const voice = voiceSelect.value;

  if (!script) {
    alert("台本を入力してください。");
    return;
  }

  try {
    generateButton.disabled = true;
    downloadArea.classList.add("hidden");
    statusText.textContent = "動画を生成中です。30秒〜数分ほどお待ちください...";

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        script,
        style,
        voice
      })
    });

    if (!response.ok) {
      throw new Error("動画生成に失敗しました。");
    }

    const data = await response.json();

    statusText.textContent = "動画が完成しました！";
    downloadLink.href = `${API_BASE_URL}${data.download_url}`;
    downloadArea.classList.remove("hidden");

  } catch (error) {
    console.error(error);
    statusText.textContent = "エラーが発生しました。バックエンドのURLやログを確認してください。";
  } finally {
    generateButton.disabled = false;
  }
});
