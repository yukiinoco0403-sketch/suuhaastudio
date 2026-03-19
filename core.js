'use strict';

/* ============================================================
   core.js  ─  index.html / admin.html 共通ユーティリティ
   -----------------------------------------------------------
   使い方：
     index.html  →  toastContainer  (id="toastContainer")
     admin.html  →  toast-container (id="toast-container")
   それぞれのHTMLに合わせて containerId を変数で管理しています。
============================================================ */

/**
 * deepCopy  ─  オブジェクトのディープコピー（JSON安全な値のみ対応）
 * admin.html の設定オブジェクト操作で使用。
 */
const deepCopy = o => JSON.parse(JSON.stringify(o));

/**
 * toast  ─  画面下部に一時通知を表示する
 *
 * @param {string} msg    表示メッセージ
 * @param {string} type   'success' | 'error' | 'info'
 *
 * コンテナは id="toastContainer"（index.html）または
 * id="toast-container"（admin.html）を自動判別します。
 */
function toast(msg, type = 'success') {
    const container =
        document.getElementById('toastContainer') ||
        document.getElementById('toast-container');
    if (!container) return;

    const BG = {
        success: '#22c55e',
        error:   '#ef4444',
        info:    '#64748b',
    };
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    el.style.background = BG[type] || BG.info;
    container.appendChild(el);
    setTimeout(() => el.remove(), 2500);
}


/* ============================================================
   admin.html 保存エリア アコーディオン
   -----------------------------------------------------------
   save-area を details/summary 構造に再構築し、
   Web Animations API でスムーズな開閉アニメーションを実装します。
   スマホ（568px以下）でのみアコーディオンとして動作します。
============================================================ */

window.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.save-area')) return;

    /* 0. CSS 注入 */
    if (!document.getElementById('_mitsurimoSaveAccordionCss')) {
        const st = document.createElement('style');
        st.id = '_mitsurimoSaveAccordionCss';
        st.textContent = `
#saveSummary {
    list-style: none;
    display: flex; justify-content: space-between; align-items: center;
    pointer-events: auto; cursor: pointer;
    margin-bottom: 4px; padding: 4px 0;
}
#saveSummary:hover .save-area__title { color: var(--primary); }
#saveSummary::-webkit-details-marker { display: none; }
#saveSummary::marker { display: none; }
.save-summary__arrow {
    width: 16px; height: 16px; flex-shrink: 0;
    color: var(--s400, #94a3b8);
    display: block;
    transition: transform .3s ease;
}
#saveDetails[open] .save-summary__arrow { transform: rotate(180deg); }
.save-content-wrapper { overflow: hidden; }
details.save-guide { margin-top: 16px; }
details.save-guide summary.save-guide__title {
    padding: 10px 16px;
    font-size: 12px; font-weight: 700; color: var(--amber700, #92400e);
    cursor: pointer; list-style: none; display: flex; align-items: center; gap: 6px;
    user-select: none;
}
details.save-guide summary.save-guide__title::before {
    content: '▶'; font-size: 10px; transition: transform .3s ease;
}
details.save-guide[open] summary.save-guide__title::before { transform: rotate(90deg); }
.details-content { overflow: hidden; }
details.save-guide ol {
    padding: 0 16px 12px 34px; font-size: 12px; color: var(--amber700, #92400e); line-height: 2;
}
@media (max-width: 568px) {
    .save-area { padding: 14px 16px; bottom: 10px; margin-top: 16px; }
}`;
        document.head.appendChild(st);
    }

    /* 1. save-area を details/summary 構造に再構築 */
    if (!document.getElementById('saveDetails')) {
        const saveArea = document.querySelector('.save-area');
        if (saveArea) {
            const titleEl = saveArea.querySelector('.save-area__title');
            const descEl  = saveArea.querySelector('.save-area__desc');
            const btnsEl  = saveArea.querySelector('.save-btns');
            const guideEl = saveArea.querySelector('.save-guide');

            let guideDetails = guideEl;
            if (guideEl && guideEl.tagName !== 'DETAILS') {
                const titleDiv = guideEl.querySelector('.save-guide__title');
                const ol       = guideEl.querySelector('ol');
                guideDetails = document.createElement('details');
                guideDetails.className = 'save-guide';
                const gSum = document.createElement('summary');
                gSum.className = 'save-guide__title';
                gSum.textContent = titleDiv ? titleDiv.textContent : '📋 保存手順';
                const gContent = document.createElement('div');
                gContent.className = 'details-content';
                if (ol) gContent.appendChild(ol);
                guideDetails.append(gSum, gContent);
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'save-content-wrapper';
            if (descEl)       wrapper.appendChild(descEl);
            if (btnsEl)       wrapper.appendChild(btnsEl);
            if (guideDetails) wrapper.appendChild(guideDetails);

            const newSummary = document.createElement('summary');
            newSummary.id = 'saveSummary';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'save-area__title';
            titleSpan.textContent = titleEl ? titleEl.textContent : '💾 設定を保存する';
            newSummary.appendChild(titleSpan);
            newSummary.insertAdjacentHTML('beforeend', '<svg class="save-summary__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>');

            const newDetails = document.createElement('details');
            newDetails.id = 'saveDetails';
            if (window.innerWidth > 568) {
                newDetails.setAttribute('open', '');
            }
            newDetails.append(newSummary, wrapper);

            saveArea.innerHTML = '';
            saveArea.appendChild(newDetails);
        }
    }

    /* 2. #saveDetails アコーディオン（Web Animations API） */
    {
        const det = document.getElementById('saveDetails');
        const sum = document.getElementById('saveSummary');
        if (det && sum) {
            const wrapper = det.querySelector('.save-content-wrapper');
            if (wrapper) {
                let _animSD   = null;
                let _prevWide = window.innerWidth;

                function _openSaveArea(animate) {
                    det.setAttribute('open', '');
                    if (!animate) return;
                    if (_animSD) { _animSD.cancel(); _animSD = null; }
                    const h = wrapper.scrollHeight;
                    _animSD = wrapper.animate(
                        [{ height: '0px' }, { height: h + 'px' }],
                        { duration: 300, easing: 'ease-out' }
                    );
                    _animSD.onfinish = () => { wrapper.style.height = ''; _animSD = null; };
                }

                function _closeSaveArea(animate) {
                    if (!animate) { det.removeAttribute('open'); return; }
                    if (_animSD) { _animSD.cancel(); _animSD = null; }
                    _animSD = wrapper.animate(
                        [{ height: wrapper.offsetHeight + 'px' }, { height: '0px' }],
                        { duration: 300, easing: 'ease-out' }
                    );
                    _animSD.onfinish = () => {
                        det.removeAttribute('open');
                        wrapper.style.height = '';
                        _animSD = null;
                    };
                }

                sum.addEventListener('click', e => {
                    e.preventDefault();
                    det.open ? _closeSaveArea(true) : _openSaveArea(true);
                });

                window.addEventListener('resize', () => {
                    const now  = window.innerWidth;
                    const wasM = _prevWide <= 568;
                    const isM  = now       <= 568;
                    _prevWide  = now;
                    if (wasM === isM) return;
                    if (_animSD) { _animSD.cancel(); _animSD = null; wrapper.style.height = ''; }
                    if (!isM) {
                        det.setAttribute('open', '');
                    } else {
                        det.removeAttribute('open');
                    }
                });
            }
        }
    }

    /* 3. save-guide アコーディオン（Web Animations API） */
    document.querySelectorAll('details.save-guide:not([data-anim-bound])').forEach(det => {
        det.setAttribute('data-anim-bound', '1');
        const origSummary = det.querySelector('summary');
        const content     = det.querySelector('.details-content');
        if (!origSummary || !content) return;

        const summary = origSummary.cloneNode(true);
        origSummary.parentNode.replaceChild(summary, origSummary);

        let anim = null;

        summary.addEventListener('click', e => {
            e.preventDefault();
            if (anim) { anim.cancel(); anim = null; }

            if (det.open) {
                anim = content.animate(
                    [{ height: content.offsetHeight + 'px' }, { height: '0px' }],
                    { duration: 300, easing: 'ease-out' }
                );
                anim.onfinish = () => { det.removeAttribute('open'); anim = null; };
            } else {
                det.setAttribute('open', '');
                const h = content.offsetHeight;
                anim = content.animate(
                    [{ height: '0px' }, { height: h + 'px' }],
                    { duration: 300, easing: 'ease-out' }
                );
                anim.onfinish = () => { anim = null; };
            }
        });
    });

});
