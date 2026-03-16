"""Farmer notes/records (in-memory store; replace with DB in production)."""
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# In-memory store: list of notes. Key by farmer_id for simplicity.
_notes: list[dict] = []


class NoteCreate(BaseModel):
    farmer_id: str = "farmer_1"
    crop: str = ""
    season: str = ""  # e.g. "2024 main"
    note: str = ""


class NoteOut(BaseModel):
    id: str
    farmer_id: str
    crop: str
    season: str
    note: str
    created_at: str


@router.get("/notes")
def list_notes(farmer_id: str = "farmer_1"):
    """List notes for a farmer (optional filter by crop or season)."""
    out = [n for n in _notes if n.get("farmer_id") == farmer_id]
    out.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return {"notes": out}


@router.post("/notes", response_model=NoteOut)
def create_note(body: NoteCreate):
    """Save a note (crop, season, note text)."""
    import uuid
    n = {
        "id": str(uuid.uuid4()),
        "farmer_id": body.farmer_id,
        "crop": body.crop,
        "season": body.season,
        "note": body.note,
        "created_at": datetime.utcnow().isoformat() + "Z",
    }
    _notes.append(n)
    return n


@router.delete("/notes/{note_id}")
def delete_note(note_id: str):
    """Delete a note by id."""
    global _notes
    _notes = [n for n in _notes if n.get("id") != note_id]
    return {"ok": True}
