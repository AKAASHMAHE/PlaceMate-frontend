import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./Forum.css";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// ---------------- AskQuestionModal ----------------
function AskQuestionModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setTagsText("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await api.post("/forum/questions", { title, description, tags });
      onCreated && onCreated(res.data);
      setLoading(false);
      onClose();
      navigate(`/forum/${res.data._id}`);
    } catch (err) {
      console.error("Failed to post question", err);
      alert(err?.response?.data?.message || "Failed to post question");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal card">
        <h3 className="modal-title">Ask a Question</h3>
        <form onSubmit={handleSubmit}>
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Short, clear question title"
          />

          <label className="label">Description</label>
          <textarea
            rows={6}
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Add details, code, errors, and expected behaviour..."
          />

          <label className="label">Tags (comma separated)</label>
          <input
            type="text"
            className="input"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="e.g. dsa, javascript, interview"
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Posting..." : "Post Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- QuestionList ----------------
function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAsk, setShowAsk] = useState(false);
  const debounceRef = useRef(null);

  const fetchQuestions = useCallback(async (searchValue = q) => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (searchValue?.trim()) params.search = searchValue.trim();
      if (tag?.trim()) params.tag = tag.trim();
      const res = await api.get("/forum/questions", { params });
      setQuestions(res.data.questions || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, q, tag]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchQuestions(q);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [q, tag, fetchQuestions]);

  const onCreated = (newQuestion) => {
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const toggleUpvoteQuestion = async (id) => {
    try {
      await api.post(`/forum/questions/${id}/upvote`);
      await fetchQuestions();
    } catch (err) {
      console.error(err);
      alert("Could not toggle upvote");
    }
  };

  return (
    <div className="page">
      <div className="toolbar">
        <h2 className="title">Forum</h2>
        <div className="controls">
       
          <input
            className="search"
            placeholder="Filter by tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button className="btn" onClick={() => setShowAsk(true)}>Ask Question</button>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="list">
          {questions.length === 0 && <p className="muted">No questions found.</p>}
          {questions.map((qq) => (
            <article key={qq._id} className="card question-card">
              <div className="card-header">
                <Link to={`/forum/${qq._id}`} className="q-title">{qq.title}</Link>
                <div className="tag-row">
                  {(qq.tags || []).map((t) => <span key={t} className="tag-pill">{t}</span>)}
                </div>
              </div>
              <div className="card-meta">
                <div>asked by {qq.askedBy?.name || "Unknown"} • {new Date(qq.createdAt).toLocaleString()}</div>
                <button className="btn-ghost" onClick={() => toggleUpvoteQuestion(qq._id)}>⬆ {qq.upvotes?.length || 0}</button>
              </div>
              <p className="excerpt">{qq.description?.slice(0, 300)}{qq.description?.length > 300 ? "..." : ""}</p>
            </article>
          ))}
        </div>
      )}

      <div className="pagination">
        <button className="btn-ghost" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span className="muted">Page {page} / {totalPages}</span>
        <button className="btn-ghost" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      <AskQuestionModal open={showAsk} onClose={() => setShowAsk(false)} onCreated={onCreated} />
    </div>
  );
}

// ---------------- QuestionDetail ----------------
function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/forum/questions/${id}`);
      setQuestion(res.data.question);
      setReplies(res.data.replies || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load question");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { if (id) fetchQuestion(); }, [id, fetchQuestion]);

  const postReply = async (parentReply = null) => {
    if (!replyText.trim()) return alert("Reply cannot be empty");
    setPosting(true);
    try {
      await api.post(`/forum/questions/${id}/replies`, { content: replyText, parentReply });
      setReplyText("");
      setReplyTo(null);
      await fetchQuestion();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to post reply");
    } finally {
      setPosting(false);
    }
  };

  const toggleUpvoteReply = async (rid) => {
    try {
      await api.post(`/forum/replies/${rid}/upvote`);
      await fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  };

  const renderReplies = (replyList, level = 0) => {
    return replyList.map((r) => (
      <div key={r._id} className="reply" style={{ marginLeft: level * 25 }}>
        <div className="reply-head">
          <div>
            <strong>{r.repliedBy?.name}</strong>
            <div className="muted small">{new Date(r.createdAt).toLocaleString()}</div>
          </div>
          <button className="btn-ghost" onClick={() => toggleUpvoteReply(r._id)}>⬆ {r.upvotes?.length || 0}</button>
        </div>
        <div className="reply-content">{r.content}</div>
        <button className="btn-ghost small" onClick={() => setReplyTo(r._id)}>💬 Reply</button>

        {replyTo === r._id && (
          <div className="nested-reply-box mt-2">
            <textarea
              className="textarea"
              rows={3}
              placeholder={`Replying to ${r.repliedBy?.name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button onClick={() => postReply(r._id)} disabled={posting} className="btn">
                {posting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </div>
        )}

        {r.children?.length > 0 && renderReplies(r.children, level + 1)}
      </div>
    ));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!question) return <div className="p-6">Question not found</div>;

  return (
    <div className="p-6 page">
      <article className="card question-detail">
        <h2 className="detail-title">{question.title}</h2>
        <p className="muted small">asked by {question.askedBy?.name} • {new Date(question.createdAt).toLocaleString()}</p>
        <p className="mt-4">{question.description}</p>
        <div className="tag-row mt-3">{(question.tags || []).map((t) => <span key={t} className="tag-pill">{t}</span>)}</div>
      </article>

      <section className="card replies-card mt-6">
        <h3 className="replies-title">Replies ({replies.length})</h3>
        {replies.length === 0 && <p className="muted">No replies yet.</p>}
        {renderReplies(replies)}

        <div className="reply-box mt-6">
          <h4 className="reply-box-title">Write a Reply</h4>
          <textarea
            className="textarea"
            rows={5}
            placeholder="Share your thoughts, solutions, or experience..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <button onClick={() => postReply(null)} disabled={posting} className="btn">
              {posting ? "Posting..." : "Post Reply"}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-4">
        <Link to="/forum" className="btn btn-ghost">Back to questions</Link>
      </div>
    </div>
  );
}

// ---------------- Forum Page ----------------
export default function ForumPage() {
  return (
    <Routes>
      <Route path="/" element={<QuestionList />} />
      <Route path=":id" element={<QuestionDetail />} />
    </Routes>
  );
}
